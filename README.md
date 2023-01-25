## Amplify
```shell
# manage environment
amplify env list
amplify env checkout dev
amplify env checkout production

# push resources
amplify push -y

# open console
amplify console api
amplify console
```

## Expo
```shell
# build
npx eas build --profile preview --platform ios
npx eas build --profile preview --platform android

# info
eas project:info

```
