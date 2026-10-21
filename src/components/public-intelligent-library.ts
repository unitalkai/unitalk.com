"use client";

import "@/lib/public-openui-devtools";
import { defineFunction } from "@openuidev/react-lang";
import { z } from "zod/v4";
import { library as upstreamLibrary } from "open-intelligent-ui/src/lib/library";

// One extra function for the local calculator starter. All upstream components,
// actions and 59 functions are retained, with their original argument order.
export const intelligentLibrary = upstreamLibrary.extend({ functions: { add: [defineFunction({
  name: "Number", description: "Parse a finite numeric keypad string.",
  params: z.object({ text: z.string() }), returns: z.number(),
  fn: ({ text }) => Number.isFinite(Number(text)) ? Number(text) : 0,
})] } });
