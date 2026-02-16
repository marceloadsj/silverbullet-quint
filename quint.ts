import { CodeWidgetContent } from "@silverbulletmd/silverbullet/type/client";
import { createHighlighterCore } from "shiki/core"
import nord from "@shikijs/themes/nord"
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

export async function quint(bodyText: string): Promise<CodeWidgetContent> {
  const highlighter = await createHighlighterCore({
    theme: nord,
    langs: [
      {
        id: "quint",
        scopeName: QUINT_TMLANGUAGE.scopeName,
        grammar: QUINT_TMLANGUAGE,
      },
    ],
    engine: createOnigurumaEngine(import('shiki/wasm'))
  });

  return {
    html: highlighter.codeToHtml(bodyText, {
      lang: "quint", theme: "nord"
    }),
  };
}

const QUINT_TMLANGUAGE = {
  "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  "name": "Quint",
  "patterns": [
    {
      "include": "#hashbangLine"
    },
    {
      "include": "#lineComments"
    },
    {
      "include": "#blockComments"
    },
    {
      "include": "#keywords"
    },
    {
      "include": "#storage"
    },
    {
      "include": "#constants"
    },
    {
      "include": "#operators"
    },
    {
      "include": "#identifiers"
    },
    {
      "include": "#strings"
    },
    {
      "include": "#numbers"
    }
  ],
  "repository": {
    "identifiers": {
      "patterns": [{
        "name": "meta.quint",
        "match": "[a-zA-Z_]([a-zA-Z0-9_])*"
      }]
    },
    "keywords": {
      "patterns": [
        {
          "name": "keyword.control.quint",
          "match": "\\b(module|import|from|export|as|if|else|not|or|and|implies|iff|all|any)\\b"
        }
      ]
    },
    "storage": {
      "patterns": [
        {
          "name": "storage.modifier.quint",
          "match": "\\b(type|assume|const|var|val|nondet|def|pure|action|temporal|run)\\b"
        },
        {
          "name": "storage.type.quint",
          "match": "\\b(Tup|Rec|Set|List|int|str|bool)\\b"
        }
      ]
    },
    "operators": {
      "patterns": [
        {
          "name": "keyword.operator.quint",
          "match": "(=>|<=|>|<|=|!=|\\.|\\*|\\+|-|/|%|\\^)"
        }
      ]
    },
    "strings": {
      "name": "string.quoted.double.quint",
      "begin": "\"",
      "end": "\"",
      "patterns": [
        {
          "name": "constant.character.escape.quint",
          "match": "\\\\."
        }
      ]
    },
    "numbers": {
      "patterns": [
        {
          "name": "constant.numeric.quint",
          "match": "-?(0x[0-9a-fA-F]([0-9a-fA-F]|_[0-9a-fA-F])*|0|[1-9]([0-9]|_[0-9])*)"
        }
      ]
    },
    "constants": {
      "patterns": [
        {
          "name": "constant.language.quint",
          "match": "(false|true|Bool|Int|Nat)"
        }
      ]
    },
    "hashbangLine": {
      "patterns": [
        {
          "name": "comment.line.hashbang.quint",
          "match": "^#!.*$"
        }
      ]
    },
    "lineComments": {
      "patterns": [
        {
          "name": "comment.line.double-slash.quint",
          "match": "//.*$"
        }
      ]
    },
    "blockComments": {
      "name": "comment.block.quint",
      "begin": "/\\*",
      "end": "\\*/",
      "patterns": []
    }
  },
  "scopeName": "source.quint"
}