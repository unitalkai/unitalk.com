"use client";

import "@/lib/public-openui-devtools";

// Scoped adaptation of thesysdev/open-intelligent-ui's component-library and
// gallery Renderer pattern. See OPENUI-INTEGRATION.md and THIRD-PARTY-NOTICES.md.
import { action, createLibrary, defineComponent, Renderer, tagSchemaId, useIsStreaming, useTriggerAction, type ActionEvent, type OpenUIError } from "@openuidev/react-lang";
import Image from "next/image";
import { Component, useCallback, useState, type ReactNode } from "react";
import { z } from "zod/v4";
import { PATRICK_LINKEDIN } from "@/lib/public-collaborator-demo";
import { publicResponseProgram, type PublicPresentation } from "@/lib/public-openui";
import type { PublicLanguage } from "@/lib/public-collaborator-language";
import { Icon } from "./icons";

const node = z.unknown();
tagSchemaId(node, "Node");
const children = z.array(node);

const Col = defineComponent({
  name: "Col", props: z.object({ children }), description: "Vertical response flow.",
  component: ({ props, renderNode }) => <div className="public-ui-col">{renderNode(props.children)}</div>,
});
const Row = defineComponent({
  name: "Row", props: z.object({ children }), description: "Wrapping follow-up actions.",
  component: ({ props, renderNode }) => <div className="public-ui-row">{renderNode(props.children)}</div>,
});
const Text = defineComponent({
  name: "Text", props: z.object({ text: z.string() }), description: "Plain text paragraph.",
  component: ({ props }) => <p>{props.text}</p>,
});
const Title = defineComponent({
  name: "Title", props: z.object({ text: z.string() }), description: "Response section heading.",
  component: ({ props }) => <h3>{props.text}</h3>,
});
const Card = defineComponent({
  name: "Card", props: z.object({ children }), description: "A response artifact.",
  component: ({ props, renderNode }) => <section className="public-ui-card">{renderNode(props.children)}</section>,
});
const Button = defineComponent({
  name: "Button", props: z.object({ label: z.string(), action: action() }), description: "Send a follow-up request to this conversation.",
  component: function ResponseButton({ props }) {
    const trigger = useTriggerAction();
    const streaming = useIsStreaming();
    return <button type="button" className="public-ui-button" disabled={streaming} onClick={() => void trigger(props.label, undefined, props.action)}>{props.label}<Icon name="arrow" width={16} height={16} /></button>;
  },
});
const Profile = defineComponent({
  name: "Profile", props: z.object({ description: z.string(), linkLabel: z.string() }), description: "Patrick's verified public identity.",
  component: ({ props }) => <section className="public-ui-profile">
    <Image src="/images/patrick-chassany.jpg" width={72} height={72} alt="Patrick Chassany" />
    <div><h3>Patrick Chassany</h3><p>{props.description}</p><a href={PATRICK_LINKEDIN} target="_blank" rel="noopener noreferrer">{props.linkLabel}<Icon name="external" width={16} height={16} /></a></div>
  </section>,
});

const library = createLibrary({ root: "Col", components: [Col, Row, Text, Title, Card, Button, Profile] });

class ResponseBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function PublicOpenUIResponse({ text, presentation, language, onPrompt, disabled }: {
  text: string; presentation?: PublicPresentation; language: PublicLanguage; onPrompt: (text: string) => void; disabled: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const handleError = useCallback((errors: OpenUIError[]) => setFailed(errors.length > 0), []);
  const handleAction = (event: ActionEvent) => {
    if (!disabled && event.type === "continue_conversation" && event.humanFriendlyMessage) onPrompt(event.humanFriendlyMessage);
  };
  const fallback = <p>{text}</p>;
  return <ResponseBoundary fallback={fallback}>
    {failed && fallback}
    <div hidden={failed}>
      <Renderer response={publicResponseProgram(text, presentation, language)} library={library} isStreaming={disabled} onAction={handleAction} onError={handleError} publishObservability={false} />
    </div>
  </ResponseBoundary>;
}
