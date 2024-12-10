# find ./web/app-skew -type f | grep '.sk'
shopt -s globstar
skewc web/app/**/*.sk --output-file=web/js/app.js --target=js --message-limit=0
