export class CoinMarket {
  public id: string;
  public up: boolean;
  public name: string;
  public image: string;
  public down: boolean;
  public symbol: string;
  public currentPrice: number;
  public priceChange24h: number;

  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.image = data?.image;
    this.symbol = data?.symbol;
    this.currentPrice = data?.current_price || 0;
    this.priceChange24h = data?.price_change_percentage_24h || 0;
    this.up = this.priceChange24h > 0;
    this.down = this.priceChange24h < 0;
  }
}
