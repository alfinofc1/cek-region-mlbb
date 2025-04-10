import { useState } from "react";
import { getCountryNameAndFlag } from "@/utils/country";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX } from "lucide-react";

const FormData = () => {
  const [formData, setFormData] = useState({
    id: "",
    serverId: "",
  });

  const [response, setResponse] = useState(null);
  const [previousResponse, setPreviousResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedFormData, setSubmittedFormData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const { id, serverId } = formData;

      if (isNaN(id) || isNaN(serverId)) {
        setError("Invalid ID or Server!");
        setLoading(false);
        setResponse(null);
        return;
      }

      const res = await fetch("/api/stalk-ml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, serverId }),
      });

      const result = await res.json();

      if (res.ok) {
        setPreviousResponse(response);
        setResponse(result);
        setSubmittedFormData({ id, serverId });
      } else {
        setError(result.error || "Error! Check again your ID or Server!");
        setResponse(null);
      }
    } catch (error) {
      setError("Failed!");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Region Check for MLBB</CardTitle>
          <CardDescription>
            Just input your MLBB ID and Server ^^
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="user_id">ID</Label>
                <Input
                  id="user_id"
                  name="id"
                  type="text"
                  placeholder="1234567890"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="server">Server</Label>
                <Input
                  id="server"
                  name="serverId"
                  type="text"
                  placeholder="1234"
                  value={formData.serverId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <CardFooter className="mt-4 p-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Checking..." : "Check!"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert className="w-full max-w-md bg-red-600 text-white">
          <CircleX />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response &&
        (() => {
          const nicknameRegion = response.nickName?.split("|") || [];
          const nickname = nicknameRegion[0] || "-";
          const regionIdRaw = nicknameRegion[1] || "";
          const regionId = regionIdRaw.replace(/^Region/, "").trim();
          const country = getCountryNameAndFlag(regionId);

          return (
            <Card className="w-full max-w-md">
              <CardContent className="space-y-1">
                <p>
                  <strong>ID:</strong> {submittedFormData?.id || "-"}
                </p>
                <p>
                  <strong>Server:</strong> {submittedFormData?.serverId || "-"}
                </p>
                <p>
                  <strong>Nickname:</strong> {nickname}
                </p>
                <p>
                  <strong>Region:</strong> {country}
                </p>
              </CardContent>
            </Card>
          );
        })()}
    </>
  );
};

export default FormData;
