.DEFAULT_GOAL := help
.PHONY: help setup

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Creates a single file bundle
	@awk '/version/{print "/* v" $$NF " */"}' package.json | tr -d '",' > version
	@npm run build
	@cat ./version ./dist/logger.js > temp && mv -f temp ./dist/logger.js
	@rm ./version

publish: ## Pushes to Github registry
	@npm publish
