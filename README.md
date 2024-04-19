# Toggle Jta

In intellij, When configuring wilfly/jboss. Add this script to Before Launch in jboss

```
node node ./toggledb/toggleJta.js --env=homol
```

In my case I added a package.json in the root of my project to do some other scripting. In intellij, I added a npm script. But perharps you could run it directly withou a package.json.
