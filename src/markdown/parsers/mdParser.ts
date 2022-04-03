import { Renderer, marked } from "marked";
import { languages, highlight } from "prismjs";

import { BaseParser } from "./baseParser";

// languages
require("prismjs/components/prism-actionscript");
require("prismjs/components/prism-applescript");
require("prismjs/components/prism-aspnet");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-basic");
require("prismjs/components/prism-batch");
require("prismjs/components/prism-c");
require("prismjs/components/prism-coffeescript");
require("prismjs/components/prism-cpp");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-d");
require("prismjs/components/prism-dart");
require("prismjs/components/prism-erlang");
require("prismjs/components/prism-fsharp");
require("prismjs/components/prism-go");
require("prismjs/components/prism-graphql");
require("prismjs/components/prism-groovy");
require("prismjs/components/prism-handlebars");
require("prismjs/components/prism-java");
require("prismjs/components/prism-json");
require("prismjs/components/prism-latex");
require("prismjs/components/prism-less");
require("prismjs/components/prism-livescript");
require("prismjs/components/prism-lua");
require("prismjs/components/prism-makefile");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-nginx");
require("prismjs/components/prism-objectivec");
require("prismjs/components/prism-pascal");
require("prismjs/components/prism-perl");
require("prismjs/components/prism-php");
require("prismjs/components/prism-powershell");
require("prismjs/components/prism-python");
require("prismjs/components/prism-r");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-rust");
require("prismjs/components/prism-sass");
require("prismjs/components/prism-scheme");
require("prismjs/components/prism-smalltalk");
require("prismjs/components/prism-smarty");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-stylus");
require("prismjs/components/prism-swift");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-vim");
require("prismjs/components/prism-yaml.min");

// aliases;
languages["c#"] = languages.csharp;
languages["f#"] = languages.fsharp;
languages.sh = languages.bash;
languages.md = languages.markdown;
languages.py = languages.python;
languages.yml = languages.yaml;
languages.rb = languages.ruby;

/**
 * Parse a markdown string to HTML
 */
export class MdParser extends BaseParser {
  private renderer: Renderer;

  constructor(options: any) {
    super(options);
    this.initMarked();
    this.renderer = new Renderer();
  }

  /**
   * Highlight code with prism.js
   * @param {string} code
   * @param {string} lang
   */
  highlight(code: string, lang: string) {
    const parsedLang = lang || "bash";
    if (languages[parsedLang]) {
      return highlight(code, languages[parsedLang], parsedLang);
    }
    return code;
  }

  /**
   * Init marked with Prismjs
   * @returns {void}
   * @private
   */
  initMarked(): void {
    marked.setOptions({
      renderer: this.renderer,
      gfm: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      mangle: false,
      highlight: this.highlight,
    });
  }

  async parse(mdString: string): Promise<string> {
    return new Promise((resolve, reject) => {
      marked.parse(mdString, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  }
}
