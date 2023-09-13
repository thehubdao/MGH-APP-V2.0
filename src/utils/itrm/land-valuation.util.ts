﻿import {Result} from "../../types/common.type";
import {Raise} from "../common.util";
import axios from "axios/index";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {
  LandValuationDatum,
  MetaverseGlobalData,
  MetaversePerformance
} from "../../interfaces/itrm/land-valuation.interface";
import {Metaverses} from "../../enums/metaverses.enum";

// type ApiMetaverse = 'sandbox' | 'decentraland' | 'fluf' | 'somnium-space';

interface MapParams {
  from: number;
  size: number;
  tokenId?: number;
  x?: number;
  y?: number;
  reduced?: boolean;
}

export async function GetMapLandValuation(metaverse: Metaverses, params: MapParams): Promise<Result<Record<string, LandValuationDatum>>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");
    // const requestEnd = metaverse === "fluf" ? "collection" : "map";
    const requestEnd = "map";

    const response = await axios.get<Record<string, LandValuationDatum>>(`${itrmServiceUrl}/mgh/v2/${metaverse}/${requestEnd}`, {
      params
    });

    return {success: true, value: response.data};
  } catch (err) {
    const msg = "Error while getting Metaverse land valuation data!";
    LogError(Module.ITRMLandValuation, msg, err);
    return {success: false, errMessage: msg};
  }
}

interface GlobalDataResponseV2 {
  stats: MetaverseGlobalData;
}

export async function GetMetaverseGlobalData(metaverse: Metaverses): Promise<Result<MetaverseGlobalData>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    const response = await axios.get<GlobalDataResponseV2>(`${itrmServiceUrl}/mgh/v2/${metaverse}/globalData`);
    return {success: true, value: response.data.stats};
  } catch (err) {
    const msg = "Error while getting Metaverse Global Data!";
    LogError(Module.ITRMLandValuation, msg, err);
    return {success: false, errMessage: msg};
  }
}

export async function GetMetaversePerformance(metaverse: Metaverses): Promise<Result<MetaversePerformance>> {
  try {
    const itrmServiceUrl = process.env.NEXT_PUBLIC_ITRM_SERVICE ?? Raise("Missing ITRMService url on env variables!");

    const response = await axios.get<MetaversePerformance>(`${itrmServiceUrl}/mgh/v2/${metaverse}/performance`);
    return {success: true, value: response.data};
  } catch (err) {
    const msg = "Error while getting Metaverse Performance!";
    LogError(Module.ITRMLandValuation, msg, err);
    return {success: false, errMessage: msg};
  }
}