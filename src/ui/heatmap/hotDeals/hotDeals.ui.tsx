import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';
import NextButton from "./nextButton.ui";
import HotDealsCardUI from "./hotDealsCard.ui";
import { HotDealsCard } from "../../../interfaces/heatmap.interface";
import { Metaverses } from "../../../enums/metaverses.enum";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const cardData: HotDealsCard[] = [
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -5.2,
    current_price_eth: 3.75,
    eth_predicted_price: 4.1,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/1" },
    name: "Land 1 prueba de largo de titulo asdalskdjlaksjdlaskdjl",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 2",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 3",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 4",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },
  {
    images: { image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75" },
    gap: -3.8,
    current_price_eth: 2.95,
    eth_predicted_price: 3.2,
    external_link: "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/115792089237316195423570985008687907828089089513491117743167863057962281992212",
    market_links: { opensea: "https://opensea.io/2" },
    name: "Land 5",
  },

];

interface HotDealsUIProps {
  metaverseSelected: Metaverses;
}

export default function HotDealsUI({ metaverseSelected }: HotDealsUIProps) {
  return (
    <div>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={25}
        slidesPerView='auto'
        scrollbar={{ draggable: true }}
        style={{ padding: '0px 40px' }}
      >
        {cardData.map((land: HotDealsCard, index: number) => {
          return (
            <SwiperSlide
              key={index}
              style={{ width: '180px' }}
            >
              <HotDealsCardUI
                metaverseSelected={metaverseSelected}
                cardData={land}
                name={land.name}
              />
            </SwiperSlide>
          );
        })}

        <NextButton isLeft />
        <NextButton />
      </Swiper>
    </div>
  )
}