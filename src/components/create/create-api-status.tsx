"use client";



import { useEffect, useState } from "react";



type Health = {

  generationMode: string;

  message: string;

  modelLabel?: string;

  model?: string;

  imageModel?: string;

};



export function CreateApiStatus() {

  const [health, setHealth] = useState<Health | null>(null);



  useEffect(() => {

    fetch("/api/health")

      .then((r) => r.json())

      .then((d) => setHealth(d as Health))

      .catch(() => setHealth(null));

  }, []);



  if (!health) return null;



  return (

    <p className="mb-3 rounded-lg border border-border-subtle bg-surface/80 px-3 py-2 text-xs text-muted-foreground">

      {health.message}

      {health.model ? (
        <span className="text-muted">
          {" "}
          · Text: <code className="text-foreground">{health.model}</code>
        </span>
      ) : null}
      {health.imageModel ? (
        <span className="text-muted">
          {" "}
          · Image: <code className="text-foreground">{health.imageModel}</code>
        </span>
      ) : null}

    </p>

  );

}


