import { useMemo } from "react";
import DraggableResizable from "./DraggableResizable";
import TranslationPanelHeader from "../../components/TranslationPanel/Header";
import TranslationPanelContent from "../../components/TranslationPanel/Content";
import { MSG_OPEN_SEPARATE_WINDOW } from "../../config/msg";
import { resolveApiPromptList, withScenePrompt } from "../../config";
import { sendBgMsg } from "../../libs/msg";
import { isExt } from "../../libs/client";
import { isValidWord } from "../../libs/utils";
import useTranboxFocus from "../../hooks/useTranboxFocus";
import { getAdaptiveTranBoxSize } from "../../libs/tranboxPosition";
import { useEffect, useRef } from "react";

export { getOverflowMenuPosition } from "../../components/TranslationPanel/Header";

const openSeparateWindow = () => sendBgMsg(MSG_OPEN_SEPARATE_WINDOW);

/** Add selection behavior and its draggable host to the shared panel. */
export default function TranBox(props) {
  const {
    showBox,
    setShowBox,
    text,
    setText,
    simpleStyle,
    setSimpleStyle,
    hideClickAway,
    setHideClickAway,
    followSelection,
    setFollowSelection,
    boxPosition,
    setBoxPosition,
    boxSize,
    setBoxSize,
    tranboxSetting = {},
    transApis,
    prompts,
    langDetector,
    translateVariants,
    parseLatex,
    selectionContext,
    subtitleSetting,
  } = props;

  const panelRef = useTranboxFocus({
    showBox,
    hideOnBlur: hideClickAway,
    setShowBox,
  });

  const isManualResizedRef = useRef(false);
  const prevTextRef = useRef(text);
  const adaptiveSizeEnabled = tranboxSetting?.adaptiveSize !== false;

  // 当外部划词文本改变时，重置手动尺寸标记，使其重新根据新文本计算自适应大小
  useEffect(() => {
    if (text !== prevTextRef.current) {
      prevTextRef.current = text;
      isManualResizedRef.current = false;
    }
  }, [text]);

  useEffect(() => {
    if (!showBox) {
      isManualResizedRef.current = false;
    }
  }, [showBox]);

  useEffect(() => {
    if (adaptiveSizeEnabled && !isManualResizedRef.current && text) {
      const adaptive = getAdaptiveTranBoxSize(text, { simpleStyle });
      if (
        boxSize &&
        (boxSize.w !== adaptive.w || boxSize.h !== adaptive.h)
      ) {
        setBoxSize?.(adaptive);
      }
    }
  }, [
    adaptiveSizeEnabled,
    text,
    simpleStyle,
    boxSize,
    setBoxSize,
  ]);

  let realApiSlugs = tranboxSetting?.apiSlugs;
  // Skip translation for single words when configured to show only dictionary results and suggestions.
  if (tranboxSetting?.singleWordNoTrans && isValidWord(text)) {
    // Clear the translation engine API slugs.
    realApiSlugs = [];
  }

  const resolvedTransApis = useMemo(() => {
    if (!transApis) return [];
    const withPrompt = transApis.map((api) =>
      withScenePrompt(api, tranboxSetting)
    );
    return resolveApiPromptList(
      withPrompt,
      prompts,
      subtitleSetting
    );
  }, [
    transApis,
    tranboxSetting,
    prompts,
    subtitleSetting,
  ]);

  return showBox ? (
    <DraggableResizable
      panelRef={panelRef}
      position={boxPosition}
      size={boxSize}
      setSize={setBoxSize}
      setPosition={setBoxPosition}
      autoHeight={
        adaptiveSizeEnabled ? true : tranboxSetting?.autoHeight !== false
      }
      onManualResize={() => {
        isManualResizedRef.current = true;
      }}
      header={
        <TranslationPanelHeader
          onClose={() => setShowBox(false)}
          onOpenSeparateWindow={isExt ? openSeparateWindow : undefined}
          draggable
          simpleStyle={simpleStyle}
          setSimpleStyle={setSimpleStyle}
          hideClickAway={hideClickAway}
          setHideClickAway={setHideClickAway}
          followSelection={followSelection}
          setFollowSelection={setFollowSelection}
        />
      }
      onClick={(e) => e.stopPropagation()}
    >
      <TranslationPanelContent
        ttsApiSlug={tranboxSetting.ttsApiSlug || ""}
        simpleStyle={simpleStyle}
        text={text}
        setText={setText}
        syncExternalTextWhileEditing
        apiSlugs={realApiSlugs}
        fromLang={tranboxSetting.fromLang}
        toLang={tranboxSetting.toLang}
        toLang2={tranboxSetting.toLang2}
        transApis={resolvedTransApis}
        prompts={prompts}
        langDetector={langDetector}
        translateVariants={translateVariants}
        parseLatex={parseLatex}
        enDict={tranboxSetting.enDict}
        enSug={tranboxSetting.enSug}
        aiDictApiSlug={tranboxSetting.aiDictApiSlug}
        aiDictPromptSlug={tranboxSetting.aiDictPromptSlug}
        selectionContext={selectionContext}
      />
    </DraggableResizable>
  ) : null;
}

