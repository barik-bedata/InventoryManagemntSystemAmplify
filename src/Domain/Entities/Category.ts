export class Category {
  constructor(
    public readonly id: number,
    public title: string,
    public products?: any[]
  ) {}
}
