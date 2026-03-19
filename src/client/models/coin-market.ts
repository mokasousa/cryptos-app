export class CoinMarket {
  public id: string;
  public rank: number;
  public name: string;
  public image: string;
  public symbol: string;
  public volume: number;
  public priceUp: boolean;
  public marketCap: number;
  public favorite?: boolean;
  public priceDown: boolean;
  public marketCapUp: boolean;
  public currentPrice: number;
  public marketCapDown: boolean;
  public priceChange24h: number;
  public marketCapChange24h: number;

  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.image = data?.image;
    this.symbol = data?.symbol;
    this.favorite = data?.favorite;
    this.volume = data?.total_volume;
    this.rank = data?.market_cap_rank;
    this.marketCap = data?.market_cap;
    this.currentPrice = data?.current_price;
    this.priceChange24h = Math.abs(data?.price_change_percentage_24h);
    this.marketCapChange24h = Math.abs(data?.market_cap_change_percentage_24h);
    this.priceUp = data?.price_change_percentage_24h > 0;
    this.priceDown = data?.price_change_percentage_24h < 0;
    this.marketCapUp = data?.market_cap_change_percentage_24h > 0;
    this.marketCapDown = data?.market_cap_change_percentage_24h < 0;
  }

  public static updateData(
    fresh: CoinMarket[],
    current: CoinMarket[]
  ): CoinMarket[] {
    const map = new Map(current.map((item) => [item.id, item]));

    return fresh.map((freshItem) => {
      const currentItem = map.get(freshItem.id);
      return currentItem ? { ...currentItem, ...freshItem } : freshItem;
    });
  }
}
