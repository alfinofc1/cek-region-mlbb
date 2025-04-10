import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const id = body.id;
    const serverId = body.serverId;

    if (!id || !serverId) {
      return NextResponse.json(
        { error: "ID and Server ID are required!" },
        { status: 400 }
      );
    }

    const payload = {
      id,
      serverId,
      gameCode: "MLREG4",
    };

    const externalRes = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await externalRes.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        {
          error: "Invalid JSON response from external API",
          rawResponse: text,
        },
        { status: 502 }
      );
    }

    // ✅ Cek jika tidak ada Region
    const nicknameRegion = data?.nickName?.split("|") || [];
    const regionIdRaw = nicknameRegion[1] || "";
    const regionId = regionIdRaw.replace(/^Region/, "").trim();

    if (!regionId) {
      return NextResponse.json(
        { error: "Account with this ID and Server not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: externalRes.status });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: "Something went wrong.." },
      { status: 500 }
    );
  }
}
