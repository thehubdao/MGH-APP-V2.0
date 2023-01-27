import { useEffect, useState } from 'react'
import * as maptalks from 'maptalks'
import {
    Atlas,
    LegendFilter,
    MapFilter,
    PercentFilter,
    ValuationTile,
} from '../../lib/heatmap/heatmapCommonTypes'
import { filteredLayer } from '../../lib/heatmap/heatmapLayers'
import { io } from 'socket.io-client'
import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { setColours, setLandColour } from '../../lib/heatmap/valuationColoring'
import { getSocketService } from '../../backend/services/SocketService'

let globalFilter: MapFilter,
    globalPercentFilter: PercentFilter,
    globalLegendFilter: LegendFilter

interface IMaptalksCanva {
    width: number | string | undefined
    height: number | string | undefined
    filter: MapFilter
    percentFilter: PercentFilter
    legendFilter: LegendFilter
    x: number | undefined
    y: number | undefined
    onClick: (land: ValuationTile, x: number, y: number) => void
    metaverse: Metaverse
}

const MaptalksCanva = ({
    width,
    height,
    filter,
    percentFilter,
    legendFilter,
    x,
    y,
    onClick,
}: IMaptalksCanva) => {
    const [map, setMap] = useState<maptalks.Map>()
    const [layer, setLayer] = useState<any>()
    const [mapData, setMapData] = useState<Record<string, ValuationTile>>({})
    const [metaverseData, setMetaverseData] = useState<any>()

    const rgbToHex = (values: any) => {
        let a = values.split(',')
        a = a.map(function (value: any) {
            value = parseInt(value).toString(16)
            return value.length == 1 ? '0' + value : value
        })
        return '#' + a.join('')
    }

    const renderHandler = async (land: any) => {
        let name = ''
        if (land.coords) {
            name = land?.coords.x + ',' + land?.coords.y
        } else {
            name = land?.center.x + ',' + land?.center.y
        }
        let value = land
        let tile: any
        if (!value.center) return
        globalFilter == 'basic'
            ? null
            : (land = await setLandColour(land, globalFilter, metaverseData))
        tile = filteredLayer(
            value.center.x,
            value.center.y,
            filter,
            percentFilter,
            legendFilter,
            value
        )
        let { color } = tile
        let borderColor = '#000'
        let borderSize = 0

        let polygon: any = new maptalks.Polygon(
            [
                [
                    [value.geometry[0].x, value.geometry[0].y],
                    [value.geometry[1].x, value.geometry[1].y],
                    [value.geometry[2].x, value.geometry[2].y],
                    [value.geometry[3].x, value.geometry[3].y],
                ],
            ],
            {
                visible: true,
                editable: true,
                shadowBlur: 0,
                shadowColor: 'black',
                draggable: false,
                dragShadow: false, // display a shadow during dragging
                drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                symbol: {
                    lineWidth: borderSize,
                    lineColor: borderColor,
                    polygonFill: color,
                    polygonOpacity: 1,
                },
                cursor: 'pointer',
            }
        )
            .on('click', () => {
                onClick(value, value.center.x, value.center.y)
            })
            .on('mouseenter', (e: any) => {
                e.target.updateSymbol({
                    polygonFill: '#db2777',
                    lineWidth: 3,
                    lineColor: '#db2777',
                })
            })
            .on('mouseout', (e: any) => {
                e.target.updateSymbol({
                    polygonFill: color,
                    lineWidth: borderSize,
                    lineColor: borderColor,
                })
            })
        polygon.landName = name
        layer.addGeometry(polygon)
        map?.setMaxExtent(new maptalks.Extent(-2, -2, 2, 2))
        const lands = mapData
        lands[name] = land
        setMapData(lands)
    }

    useEffect(() => {
        const imageLayer = new maptalks.ImageLayer('images', [
            {
                url: '/images/Waterfront_Extended_Parcels_Map_allgreen.jpg',
                extent: [-1, -1, 1, 1],
                opacity: 1,
            },
        ])

        let initialMap = new maptalks.Map('map', {
            center: [0, 0],
            zoom: 10,
            minZoom: 9,
            maxZoom: 12,
            attribution: false,
            pitch: 1,
            dragPitch: false,
            //dragRotate: false,
        })
        initialMap.addLayer(imageLayer)

        let initialLayer = new maptalks.VectorLayer('vector', [], {
            forceRenderOnMoving: true,
            forceRenderOnRotating: true,
            forceRenderOnZooming: true,
            enableSimplify: true,
            hitDetect: false,
        }).addTo(initialMap)
        setMap(initialMap)
        setLayer(initialLayer)
    }, [])

    useEffect(() => {
        const getMetaverseData = async () => {
            let dataCall: any = await fetch(
                process.env.SOCKET_SERVICE + `/limits?metaverse=somnium-space`
            )
            dataCall = await dataCall.json()
            setMetaverseData(dataCall)
        }
        getMetaverseData()
    }, [])

    useEffect(() => {
        if (!metaverseData || !layer || !map) return
        const socketServiceUrl = process.env.SOCKET_SERVICE!
        const socketService = getSocketService(
            socketServiceUrl,
            () => {
                console.log('Connected')
            },
            renderHandler
        )
        socketService.startRender('somnium-space')
        return () => {
            socketService.disconnect()
        }
    }, [metaverseData && layer && map])

    useEffect(() => {
        if (!map) return
        const filterUpdate = async () => {
            let coloredAtlas = await setColours(mapData!, filter, metaverseData)
            const coloredLayer = layer.forEach((geometry: any) => {
                const land = coloredAtlas[geometry.landName]
                const tile: any = filteredLayer(
                    land.center.x,
                    land.center.y,
                    filter,
                    percentFilter,
                    legendFilter,
                    land
                )
                const { color } = tile
                let symbol: any = geometry.getSymbol()
                symbol.polygonFill = color.includes('rgb')
                    ? rgbToHex(color.split('(')[1].split(')')[0])
                    : color
                geometry.setSymbol(symbol)
                return geometry
            })
        }
        filterUpdate()
    }, [filter, percentFilter, legendFilter, x, y])

    useEffect(() => {
        ;(globalFilter = filter),
            (globalPercentFilter = percentFilter),
            (globalLegendFilter = legendFilter)
    }, [filter, percentFilter, legendFilter])

    return (
        <canvas
            width={width}
            height={height}
            /* style={{ width, height }} */
            id="map"
        />
    )
}

export default MaptalksCanva
