import { NextResponse } from "next/server";
import { Container } from "../../../infrastructure/container";
import { bootstrap } from "../../../infrastructure/bootstrap";
import { WebhookController } from "../../../presentation/api/webhook/WebhookController";

// 서비스 초기화
bootstrap();

export async function POST(req: Request) {
  try {
    const { events } = await req.json();
    const container = Container.getInstance();
    const webhookController =
      container.get<WebhookController>("webhookController");

    await webhookController.handleWebhook(events);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
