export class News {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly date: Date,
    public readonly sourceUrl: string,
    public readonly imageUrl?: string,
    public readonly type: "topic" | "notice" = "notice"
  ) {}

  static create(
    title: string,
    content: string,
    sourceUrl: string,
    imageUrl?: string
  ): News {
    return new News(
      crypto.randomUUID(),
      title,
      content,
      new Date(),
      sourceUrl,
      imageUrl
    );
  }

  static fromLodestoneData(data: {
    title: string;
    date: string;
    text?: string;
    imgUrl?: string;
    postUrl: string;
    type: "topic" | "notice";
  }): News {
    return new News(
      crypto.randomUUID(),
      data.title,
      data.text || "",
      new Date(data.date),
      data.postUrl,
      data.imgUrl,
      data.type
    );
  }
}
