export class CoinMarket {
  public id: string;
  public name: string;
  public image: string;
  public priceChange24h: number;
  public currentPrice: number;
  public up: boolean;
  public down: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.currentPrice = data.current_price || 0;
    this.priceChange24h = data.price_change_percentage_24h || 0;
    this.up = this.priceChange24h > 0;
    this.down = this.priceChange24h < 0;
  }
}
