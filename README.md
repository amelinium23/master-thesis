# Master thesis

This master thesis is about analyzing performance of javascript runtime.

### Folder structure

This project contains several directories:

-   `thesis` - this directory contains the latex code for thesis
-   `benchmarks` - this folder contains code fot this project:
    -   `backend` - FastAPI backend for running javascript script that perform tests
    -   `js` - implementation of test in javascript for eah runtime
    -   `ts` - implementation of test in TypeScript for eah runtime
-   `.github` - workflows for creating pdf of the master thesis

### Tips

To prepare thesis pdf file you need to install packages like: `pdflatex` for preparing the latex engine into your machine. Instruction as follows [here](https://geekflare.com/how-to-install-latex-on-ubuntu/).

Also you should prepare the vs code for this, so you need add the settings json to project as:

```json
{
	"editor.codeActionsOnSave": {
		"source.fixAll": "explicit"
	},
	"latex-workshop.latex.tools": [
		{
			"name": "latexmk",
			"command": "latexmk",
			"args": [
				"-shell-escape",
				"-synctex=1",
				"-interaction=nonstopmode",
				"-file-line-error",
				"-pdf",
				"-outdir=%OUTDIR%",
				"%DOC%"
			],
			"env": {}
		}
	],
	"files.exclude": {
		"**/.git": true,
		"**/.svn": true,
		"**/.hg": true,
		"**/CVS": true,
		"**/.DS_Store": true,
		"**/Thumbs.db": true,
		"**/.classpath": true,
		"**/.project": true,
		"**/.settings": true,
		"**/.factorypath": true,
		"**/**.aux": true,
		"**/**.log": true,
		"**/**.out": true,
		"**/**.toc": true,
		"**/**.fdb_latexmk": true,
		"**/**.fls": true,
		"**/**.synctex.gz": true,
		"**/**.blg": true,
		"**/**.bbl": true,
		"**/**.run.xml": true,
		"**/**.bcf": true,
		"**/**.locode": true,
		"**/**.lof": true,
		"**/**.lot": true,
		"**/**.lol": true,
		"**/**.nio": true,
		"**/**.nlo": true,
		"**/**.equ": true,
		"**/**.pyc": true
	},
	"deno.enable": false,
	"cSpell.words": [
		"bąbelkowe",
		"clsx",
		"deno",
		"desktopowych",
		"Hono",
		"transpilowane",
		"uruchomieniowe",
		"uruchomieniowych"
	],
	"cSpell.language": "pl,en"
}
```
