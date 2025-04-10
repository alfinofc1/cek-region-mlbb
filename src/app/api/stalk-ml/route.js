import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const id = formData.get("id");
    const serverId = formData.get("serverId");

    if (!id || !serverId) {
      return NextResponse.json(
        { error: "ID and Server ID are required" },
        { status: 400 }
      );
    }

    const externalForm = new FormData();
    externalForm.append("id", id);
    externalForm.append("serverId", serverId);
    externalForm.append("gameCode", "MLREG4");

    const externalRes = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL, {
      method: "POST",
      body: externalForm,
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
        { error: "User with this ID and Server not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: externalRes.status });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
