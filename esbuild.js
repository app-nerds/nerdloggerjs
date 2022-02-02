const esbuild = require("esbuild");

esbuild.build({
	entryPoints: ["./logger.js"],
	outdir: "dist",
	bundle: true,
	minify: false,
	platform: "node",
	target: ["node16.3"],
}).catch(() => process.exit(1));
