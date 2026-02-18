Running 'gradlew :app:assembleRelease' in /home/expo/workingdir/build/android
Downloading https://services.gradle.org/distributions/gradle-8.14.3-bin.zip
10%.
20%.
30%.
40%.
50%.
60
%.
70%.
80%
90%.
100%
Welcome to Gradle 8.14.3!
Here are the highlights of this release:
 - Java 24 support
 - GraalVM Native Image toolchain selection
- Enhancements to test reporting
 - Build Authoring improvements
For more details see https://docs.gradle.org/8.14.3/release-notes.html
To honour the JVM settings for this build a single-use Daemon process will be forked. For more on this, please refer to https://docs.gradle.org/8.14.3/userguide/gradle_daemon.html#sec:disabling_the_daemon in the Gradle documentation.
Daemon will be stopped at the end of the build
> Configure project :expo-gradle-plugin:expo-autolinking-plugin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-autolinking/android/expo-gradle-plugin/expo-autolinking-plugin/build.gradle.kts:25:3: 'kotlinOptions(KotlinJvmOptionsDeprecated /* = KotlinJvmOptions */.() -> Unit): Unit' is deprecated. Please migrate to the compilerOptions DSL. More details are here: https://kotl.in/u1r8ln
> Configure project :expo-gradle-plugin:expo-autolinking-settings-plugin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-autolinking/android/expo-gradle-plugin/expo-autolinking-settings-plugin/build.gradle.kts:30:3: 'kotlinOptions(KotlinJvmOptionsDeprecated /* = KotlinJvmOptions */.() -> Unit): Unit' is deprecated. Please migrate to the compilerOptions DSL. More details are here: https://kotl.in/u1r8ln
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:settings-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:processResources
> Task :gradle-plugin:settings-plugin:processResources
> Task :gradle-plugin:shared:processResources NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:processResources NO-SOURCE
> Task :gradle-plugin:shared:compileKotlin
> Task :gradle-plugin:shared:compileJava NO-SOURCE
> Task :gradle-plugin:shared:classes UP-TO-DATE
> Task :gradle-plugin:shared:jar
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:classes UP-TO-DATE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:jar
> Task :gradle-plugin:settings-plugin:compileKotlin
> Task :gradle-plugin:settings-plugin:compileJava
NO-SOURCE
> Task :gradle-plugin:settings-plugin:classes
> Task :gradle-plugin:settings-plugin:jar
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:classes
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:jar
> Configure project :expo-dev-launcher-gradle-plugin
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/expo-dev-launcher-gradle-plugin/build.gradle.kts:25:3: 'kotlinOptions(KotlinJvmOptionsDeprecated /* = KotlinJvmOptions */.() -> Unit): Unit' is deprecated. Please migrate to the compilerOptions DSL. More details are here: https://kotl.in/u1r8ln
> Configure project :expo-module-gradle-plugin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/expo-module-gradle-plugin/build.gradle.kts:58:3: 'kotlinOptions(KotlinJvmOptionsDeprecated /* = KotlinJvmOptions */.() -> Unit): Unit' is deprecated. Please migrate to the compilerOptions DSL. More details are here: https://kotl.in/u1r8ln
> Task :expo-gradle-plugin:expo-autolinking-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:react-native-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-launcher-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-module-gradle-plugin:checkKotlinGradlePluginConfigurationErrors
SKIPPED
> Task :expo-dev-launcher-gradle-plugin:pluginDescriptors
> Task :expo-module-gradle-plugin:pluginDescriptors
> Task :expo-dev-launcher-gradle-plugin:processResources
> Task :expo-module-gradle-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-autolinking-plugin:processResources
> Task :gradle-plugin:react-native-gradle-plugin:pluginDescriptors
> Task :gradle-plugin:react-native-gradle-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin:classes
> Task :expo-gradle-plugin:expo-autolinking-plugin:jar
> Task :gradle-plugin:react-native-gradle-plugin:compileKotlin
> Task :gradle-plugin:react-native-gradle-plugin:compileJava NO-SOURCE
> Task :gradle-plugin:react-native-gradle-plugin:classes
> Task :gradle-plugin:react-native-gradle-plugin:jar
> Task :expo-dev-launcher-gradle-plugin:compileKotlin
> Task :expo-dev-launcher-gradle-plugin:compileJava NO-SOURCE
> Task :expo-dev-launcher-gradle-plugin:classes
> Task :expo-dev-launcher-gradle-plugin:jar
> Task :expo-module-gradle-plugin:compileKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/expo-module-gradle-plugin/src/main/kotlin/expo/modules/plugin/android/AndroidLibraryExtension.kt:9:24 'var targetSdk: Int?' is deprecated. Will be removed from library DSL in v9.0. Use testOptions.targetSdk or/and lint.targetSdk instead.
> Task :expo-module-gradle-plugin:compileJava NO-SOURCE
> Task :expo-module-gradle-plugin:classes
> Task :expo-module-gradle-plugin:jar
> Configure project :
[32m[ExpoRootProject][0m Using the following versions:
  - buildTools:  [32m36.0.0[0m
  - minSdk:      [32m24[0m
  - compileSdk:  [32m36[0m
  - targetSdk:   [32m36[0m
  - ndk:         [32m27.1.12297006[0m
  - kotlin:      [32m2.1.20[0m
  - ksp:         [32m2.1.20-2.0.1[0m
> Configure project :app
 ℹ️  [33mApplying gradle plugin[0m '[32mexpo-dev-launcher-gradle-plugin[0m'
> Configure project :expo
Using expo modules
  - [32mexpo-constants[0m (18.0.13)
  - [32mexpo-dev-client[0m (6.0.20)
  - [32mexpo-dev-launcher[0m (6.0.20)
- [32mexpo-dev-menu[0m (7.0.18)
- [32mexpo-dev-menu-interface[0m (2.0.0)
- [32mexpo-json-utils[0m (0.15.0)
- [32mexpo-manifests[0m (1.0.10)
- [32mexpo-modules-core[0m (3.0.29)
- [32mexpo-speech-recognition[0m (0.1.0)
- [32mexpo-updates-interface[0m (2.0.0)
- [33m[📦][0m [32mexpo-application[0m (7.0.8)
  - [33m[📦][0m [32mexpo-asset[0m (12.0.12)
  - [33m[📦][0m [32mexpo-contacts[0m (15.0.11)
- [33m[📦][0m [32mexpo-crypto[0m (15.0.8)
  - [33m[📦][0m [32mexpo-device[0m (8.0.10)
  - [33m[📦][0m [32mexpo-file-system[0m (19.0.21)
  - [33m[📦][0m [32mexpo-font[0m (14.0.11)
  - [33m[📦][0m [32mexpo-haptics[0m (15.0.8)
  - [33m[📦][0m [32mexpo-image[0m (3.0.11)
  - [33m[📦][0m [32mexpo-image-loader[0m (6.0.0)
  - [33m[📦][0m [32mexpo-image-picker[0m (17.0.10)
  - [33m[📦][0m [32mexpo-keep-awake[0m (15.0.8)
  - [33m[📦][0m [32mexpo-linear-gradient[0m (15.0.8)
  - [33m[📦][0m [32mexpo-linking[0m (8.0.11)
  - [33m[📦][0m [32mexpo-localization[0m (17.0.8)
  - [33m[📦][0m [32mexpo-media-library[0m (18.2.1)
  - [33m[📦][0m [32mexpo-notifications[0m (0.32.16)
  - [33m[📦][0m [32mexpo-secure-store[0m (15.0.8)
  - [33m[📦][0m [32mexpo-sharing[0m (14.0.8)
  - [33m[📦][0m [32mexpo-splash-screen[0m (31.0.13)
  - [33m[📦][0m [32mexpo-sqlite[0m (16.0.10)
  - [33m[📦][0m [32mexpo-system-ui[0m (6.0.9)
  - [33m[📦][0m [32mexpo-web-browser[0m (15.0.10)
> Configure project :react-native-firebase_app
:react-native-firebase_app package.json found at /home/expo/workingdir/build/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_app:firebase.bom using default value: 34.7.0
:react-native-firebase_app:play.play-services-auth using default value: 21.4.0
:react-native-firebase_app package.json found at /home/expo/workingdir/build/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_app:version set from package.json: 23.8.4 (23,8,4 - 23008004)
:react-native-firebase_app:android.compileSdk using custom value: 36
:react-native-firebase_app:android.targetSdk using custom value: 36
:react-native-firebase_app:android.minSdk using custom value: 24
:react-native-firebase_app:reactNativeAndroidDir /home/expo/workingdir/build/node_modules/react-native
> Configure project :react-native-firebase_auth
:react-native-firebase_auth package.json found at /home/expo/workingdir/build/node_modules/@react-native-firebase/auth/package.json
:react-native-firebase_app package.json found at /home/expo/workingdir/build/node_modules/@react-native-firebase/app/package.json
:react-native-firebase_auth:firebase.bom using default value: 34.7.0
:react-native-firebase_auth package.json found at /home/expo/workingdir/build/node_modules/@react-native-firebase/auth/package.json
:react-native-firebase_auth:version set from package.json: 23.8.4 (23,8,4 - 23008004)
:react-native-firebase_auth:android.compileSdk using custom value: 36
:react-native-firebase_auth:android.targetSdk using custom value: 36
:react-native-firebase_auth:android.minSdk using custom value: 24
:react-native-firebase_auth:reactNativeAndroidDir /home/expo/workingdir/build/node_modules/react-native
> Configure project :react-native-iap
[NitroModules] 🔥 NitroIap is boosted by nitro!
> Configure project :react-native-nitro-modules
[NitroModules] 🔥 Your app is boosted by nitro modules!
Checking the license for package Android SDK Build-Tools 36 in /home/expo/Android/Sdk/licenses
License for package Android SDK Build-Tools 36 accepted.
Preparing "Install Android SDK Build-Tools 36 v.36.0.0".
"Install Android SDK Build-Tools 36 v.36.0.0" ready.
Installing Android SDK Build-Tools 36 in /home/expo/Android/Sdk/build-tools/36.0.0
"Install Android SDK Build-Tools 36 v.36.0.0" complete.
"Install Android SDK Build-Tools 36 v.36.0.0" finished.
[=========                              ] 25%
[=========                              ] 25% Fetch remote repository...        
[=======================================] 100% Fetch remote repository...
> Task :expo-dev-client:preBuild UP-TO-DATE
> Task :expo-dev-launcher:preBuild UP-TO-DATE
> Task :expo-dev-menu:preBuild UP-TO-DATE
> Task :expo-dev-menu-interface:preBuild UP-TO-DATE
> Task :expo-json-utils:preBuild UP-TO-DATE
> Task :expo-manifests:preBuild UP-TO-DATE
> Task :expo-modules-core:preBuild UP-TO-DATE
> Task :expo-speech-recognition:preBuild UP-TO-DATE
> Task :expo-updates-interface:preBuild UP-TO-DATE
> Task :app:generateAutolinkingNewArchitectureFiles
> Task :app:generateAutolinkingPackageList
> Task :app:generateCodegenSchemaFromJavaScript SKIPPED
> Task :app:generateCodegenArtifactsFromSchema SKIPPED
> Task :app:generateReactNativeEntryPoint
> Task :react-native-async-storage_async-storage:generateCodegenSchemaFromJavaScript
> Task :react-native-community_datetimepicker:generateCodegenSchemaFromJavaScript
> Task :react-native-async-storage_async-storage:generateCodegenArtifactsFromSchema
> Task :expo-constants:createExpoConfig
> Task :react-native-async-storage_async-storage:preBuild
> Task :expo-constants:preBuild
> Task :react-native-firebase_app:preBuild UP-TO-DATE
> Task :react-native-firebase_auth:preBuild UP-TO-DATE
The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set. Using only .env.local and .env
> Task :react-native-community_datetimepicker:generateCodegenArtifactsFromSchema
> Task :react-native-community_datetimepicker:preBuild
> Task :react-native-iap:preBuild UP-TO-DATE
> Task :react-native-google-signin_google-signin:generateCodegenSchemaFromJavaScript
> Task :react-native-gesture-handler:generateCodegenSchemaFromJavaScript
> Task :expo:generatePackagesList
> Task :expo:preBuild
> Task :react-native-nitro-modules:generateCodegenSchemaFromJavaScript
> Task :react-native-reanimated:assertMinimalReactNativeVersionTask
> Task :react-native-reanimated:assertNewArchitectureEnabledTask SKIPPED
> Task :react-native-google-signin_google-signin:generateCodegenArtifactsFromSchema
> Task :react-native-google-signin_google-signin:preBuild
> Task :react-native-reanimated:assertWorkletsVersionTask
> Task :react-native-gesture-handler:generateCodegenArtifactsFromSchema
> Task :react-native-gesture-handler:preBuild
> Task :react-native-nitro-modules:generateCodegenArtifactsFromSchema
> Task :react-native-reanimated:generateCodegenSchemaFromJavaScript
> Task :react-native-safe-area-context:generateCodegenSchemaFromJavaScript
> Task :react-native-nitro-modules:prepareHeaders
> Task :react-native-nitro-modules:preBuild
> Task :react-native-screens:generateCodegenSchemaFromJavaScript
> Task :react-native-safe-area-context:generateCodegenArtifactsFromSchema
> Task :react-native-safe-area-context:preBuild
> Task :react-native-reanimated:generateCodegenArtifactsFromSchema
> Task :react-native-reanimated:prepareReanimatedHeadersForPrefabs
> Task :react-native-reanimated:preBuild
> Task :react-native-svg:generateCodegenSchemaFromJavaScript
> Task :react-native-worklets:assertMinimalReactNativeVersionTask
> Task :react-native-worklets:assertNewArchitectureEnabledTask SKIPPED
> Task :react-native-screens:generateCodegenArtifactsFromSchema
> Task :react-native-screens:preBuild
> Task :react-native-view-shot:generateCodegenSchemaFromJavaScript
> Task :react-native-worklets:generateCodegenSchemaFromJavaScript
> Task :sentry_react-native:generateCodegenSchemaFromJavaScript
> Task :react-native-view-shot:generateCodegenArtifactsFromSchema
> Task :react-native-view-shot:preBuild
> Task :react-native-nitro-modules:preReleaseBuild
> Task :react-native-svg:generateCodegenArtifactsFromSchema
> Task :react-native-svg:preBuild
> Task :react-native-reanimated:preReleaseBuild
> Task :expo:preReleaseBuild
> Task :expo:mergeReleaseJniLibFolders
> Task :expo:mergeReleaseNativeLibs NO-SOURCE
> Task :expo:copyReleaseJniLibsProjectOnly
> Task :expo-constants:preReleaseBuild
> Task :expo-constants:mergeReleaseJniLibFolders
> Task :expo-constants:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-constants:copyReleaseJniLibsProjectOnly
> Task :expo-dev-client:preReleaseBuild UP-TO-DATE
> Task :react-native-worklets:generateCodegenArtifactsFromSchema
> Task :expo-dev-client:mergeReleaseJniLibFolders
> Task :expo-dev-client:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-dev-client:copyReleaseJniLibsProjectOnly
> Task :expo-dev-launcher:preReleaseBuild UP-TO-DATE
> Task :sentry_react-native:generateCodegenArtifactsFromSchema
> Task :sentry_react-native:preBuild
> Task :expo-dev-menu:preReleaseBuild UP-TO-DATE
> Task :expo-dev-launcher:mergeReleaseJniLibFolders
> Task :expo-dev-launcher:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-dev-menu:mergeReleaseJniLibFolders
> Task :react-native-worklets:prepareWorkletsHeadersForPrefabs
> Task :expo-dev-launcher:copyReleaseJniLibsProjectOnly
> Task :react-native-worklets:preBuild
> Task :expo-dev-menu-interface:preReleaseBuild UP-TO-DATE
> Task :app:preBuild
> Task :react-native-worklets:preReleaseBuild
> Task :app:preReleaseBuild
> Task :expo-dev-menu:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-dev-menu:copyReleaseJniLibsProjectOnly
> Task :app:mergeReleaseJniLibFolders
> Task :expo-json-utils:preReleaseBuild UP-TO-DATE
> Task :expo-dev-menu-interface:mergeReleaseJniLibFolders
> Task :expo-dev-menu-interface:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-json-utils:mergeReleaseJniLibFolders
> Task :expo-dev-menu-interface:copyReleaseJniLibsProjectOnly
> Task :expo-manifests:preReleaseBuild UP-TO-DATE
> Task :expo-manifests:mergeReleaseJniLibFolders
> Task :expo-json-utils:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-manifests:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-json-utils:copyReleaseJniLibsProjectOnly
> Task :expo-modules-core:preReleaseBuild UP-TO-DATE
> Task :expo-manifests:copyReleaseJniLibsProjectOnly
> Task :expo-speech-recognition:preReleaseBuild UP-TO-DATE
> Task :expo-speech-recognition:mergeReleaseJniLibFolders
> Task :expo-speech-recognition:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-speech-recognition:copyReleaseJniLibsProjectOnly
> Task :expo-updates-interface:preReleaseBuild UP-TO-DATE
> Task :expo-updates-interface:mergeReleaseJniLibFolders
> Task :expo-updates-interface:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-updates-interface:copyReleaseJniLibsProjectOnly
> Task :react-native-async-storage_async-storage:preReleaseBuild
> Task :react-native-async-storage_async-storage:mergeReleaseJniLibFolders
> Task :react-native-async-storage_async-storage:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-async-storage_async-storage:copyReleaseJniLibsProjectOnly
> Task :react-native-community_datetimepicker:preReleaseBuild
> Task :react-native-community_datetimepicker:mergeReleaseJniLibFolders
> Task :react-native-community_datetimepicker:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-community_datetimepicker:copyReleaseJniLibsProjectOnly
> Task :react-native-firebase_app:preReleaseBuild UP-TO-DATE
> Task :react-native-firebase_app:mergeReleaseJniLibFolders
> Task :react-native-firebase_app:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-firebase_app:copyReleaseJniLibsProjectOnly
> Task :react-native-firebase_auth:preReleaseBuild UP-TO-DATE
> Task :react-native-firebase_auth:mergeReleaseJniLibFolders
> Task :react-native-firebase_auth:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-firebase_auth:copyReleaseJniLibsProjectOnly
> Task :react-native-gesture-handler:preReleaseBuild
> Task :react-native-gesture-handler:mergeReleaseJniLibFolders
> Task :react-native-google-signin_google-signin:preReleaseBuild
> Task :react-native-google-signin_google-signin:mergeReleaseJniLibFolders
> Task :react-native-google-signin_google-signin:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-google-signin_google-signin:copyReleaseJniLibsProjectOnly
> Task :react-native-iap:preReleaseBuild UP-TO-DATE
> Task :react-native-iap:mergeReleaseJniLibFolders
> Task :react-native-reanimated:mergeReleaseJniLibFolders
> Task :react-native-safe-area-context:preReleaseBuild
> Task :react-native-safe-area-context:mergeReleaseJniLibFolders
> Task :react-native-safe-area-context:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-safe-area-context:copyReleaseJniLibsProjectOnly
> Task :react-native-screens:preReleaseBuild
> Task :react-native-nitro-modules:configureCMakeRelWithDebInfo[arm64-v8a]
Checking the license for package CMake 3.22.1 in /home/expo/Android/Sdk/licenses
License for package CMake 3.22.1 accepted.
Preparing "Install CMake 3.22.1 v.3.22.1".
"Install CMake 3.22.1 v.3.22.1" ready.
Installing CMake 3.22.1 in /home/expo/Android/Sdk/cmake/3.22.1
"Install CMake 3.22.1 v.3.22.1" complete.
"Install CMake 3.22.1 v.3.22.1" finished.
> Task :expo-modules-core:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-screens:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-worklets:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-worklets:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-worklets:configureCMakeRelWithDebInfo[x86]
> Task :react-native-worklets:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-worklets:generateJsonModelRelease
> Task :react-native-worklets:prefabReleaseConfigurePackage
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[x86]
> Task :react-native-screens:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-reanimated:generateJsonModelRelease
> Task :react-native-reanimated:prefabReleaseConfigurePackage
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-nitro-modules:buildCMakeRelWithDebInfo[arm64-v8a]
C/C++: ninja: Entering directory `/home/expo/workingdir/build/node_modules/react-native-nitro-modules/android/.cxx/RelWithDebInfo/721h6l3c/arm64-v8a'
C/C++: /home/expo/workingdir/build/node_modules/react-native-nitro-modules/cpp/utils/ObjectUtils.cpp:51:110: warning: unused parameter 'allowCache' [-Wunused-parameter]
C/C++:    51 | void ObjectUtils::defineGlobal(jsi::Runtime& runtime, KnownGlobalPropertyName name, jsi::Value&& value, bool allowCache) {
C/C++:       |                                                                                                              ^
C/C++: 1 warning generated.
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :expo-modules-core:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[x86]
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-screens:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-worklets:buildCMakeRelWithDebInfo[arm64-v8a][worklets]
> Task :react-native-nitro-modules:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-screens:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :expo-modules-core:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-screens:configureCMakeRelWithDebInfo[x86]
> Task :react-native-nitro-modules:buildCMakeRelWithDebInfo[armeabi-v7a]
C/C++: ninja: Entering directory `/home/expo/workingdir/build/node_modules/react-native-nitro-modules/android/.cxx/RelWithDebInfo/721h6l3c/armeabi-v7a'
C/C++: /home/expo/workingdir/build/node_modules/react-native-nitro-modules/cpp/utils/ObjectUtils.cpp:51:110: warning: unused parameter 'allowCache' [-Wunused-parameter]
C/C++:    51 | void ObjectUtils::defineGlobal(jsi::Runtime& runtime, KnownGlobalPropertyName name, jsi::Value&& value, bool allowCache) {
C/C++:       |                                                                                                              ^
C/C++: 1 warning generated.
> Task :react-native-screens:buildCMakeRelWithDebInfo[x86]
> Task :react-native-screens:configureCMakeRelWithDebInfo[x86_64]
> Task :expo-modules-core:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-nitro-modules:configureCMakeRelWithDebInfo[x86]
> Task :react-native-screens:buildCMakeRelWithDebInfo[x86_64]
> Task :react-native-screens:mergeReleaseJniLibFolders
> Task :react-native-screens:mergeReleaseNativeLibs
> Task :react-native-screens:copyReleaseJniLibsProjectOnly
> Task :react-native-svg:preReleaseBuild
> Task :react-native-svg:mergeReleaseJniLibFolders
> Task :react-native-svg:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-svg:copyReleaseJniLibsProjectOnly
> Task :react-native-view-shot:preReleaseBuild
> Task :react-native-view-shot:mergeReleaseJniLibFolders
> Task :react-native-view-shot:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-view-shot:copyReleaseJniLibsProjectOnly
> Task :sentry_react-native:preReleaseBuild
> Task :sentry_react-native:mergeReleaseJniLibFolders
> Task :sentry_react-native:mergeReleaseNativeLibs NO-SOURCE
> Task :sentry_react-native:copyReleaseJniLibsProjectOnly
> Task :react-native-gesture-handler:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-gesture-handler:generateReleaseBuildConfig
> Task :react-native-gesture-handler:generateReleaseResValues
> Task :react-native-gesture-handler:generateReleaseResources
> Task :react-native-gesture-handler:packageReleaseResources
> Task :react-native-gesture-handler:parseReleaseLocalResources
> Task :react-native-gesture-handler:generateReleaseRFile
> Task :react-native-reanimated:generateReleaseBuildConfig
> Task :react-native-reanimated:generateReleaseResValues
> Task :react-native-reanimated:generateReleaseResources
> Task :react-native-reanimated:packageReleaseResources
> Task :react-native-reanimated:parseReleaseLocalResources
> Task :react-native-reanimated:generateReleaseRFile
> Task :react-native-reanimated:javaPreCompileRelease
> Task :react-native-svg:generateReleaseBuildConfig
> Task :react-native-svg:generateReleaseResValues
> Task :react-native-svg:generateReleaseResources
> Task :react-native-svg:packageReleaseResources
> Task :react-native-svg:parseReleaseLocalResources
> Task :react-native-svg:generateReleaseRFile
> Task :react-native-svg:javaPreCompileRelease
> Task :expo-modules-core:configureCMakeRelWithDebInfo[x86]
> Task :react-native-worklets:buildCMakeRelWithDebInfo[armeabi-v7a][worklets]
> Task :react-native-nitro-modules:buildCMakeRelWithDebInfo[x86]
C/C++: ninja: Entering directory `/home/expo/workingdir/build/node_modules/react-native-nitro-modules/android/.cxx/RelWithDebInfo/721h6l3c/x86'
C/C++: /home/expo/workingdir/build/node_modules/react-native-nitro-modules/cpp/utils/ObjectUtils.cpp:51:110: warning: unused parameter 'allowCache' [-Wunused-parameter]
C/C++:    51 | void ObjectUtils::defineGlobal(jsi::Runtime& runtime, KnownGlobalPropertyName name, jsi::Value&& value, bool allowCache) {
C/C++:       |                                                                                                              ^
C/C++: 1 warning generated.
> Task :react-native-svg:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :expo-modules-core:buildCMakeRelWithDebInfo[x86]
> Task :react-native-nitro-modules:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-svg:bundleLibCompileToJarRelease
> Task :react-native-gesture-handler:javaPreCompileRelease
> Task :react-native-iap:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-iap:generateReleaseBuildConfig
> Task :react-native-iap:generateReleaseResValues
> Task :react-native-iap:generateReleaseResources
> Task :react-native-iap:packageReleaseResources
> Task :react-native-iap:parseReleaseLocalResources
> Task :react-native-iap:generateReleaseRFile
> Task :react-native-iap:javaPreCompileRelease
> Task :react-native-safe-area-context:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-safe-area-context:generateReleaseBuildConfig
> Task :react-native-safe-area-context:generateReleaseResValues
> Task :react-native-safe-area-context:generateReleaseResources
> Task :react-native-safe-area-context:packageReleaseResources
> Task :react-native-safe-area-context:parseReleaseLocalResources
> Task :react-native-safe-area-context:generateReleaseRFile
> Task :react-native-safe-area-context:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
> Task :react-native-safe-area-context:javaPreCompileRelease
> Task :react-native-safe-area-context:compileReleaseJavaWithJavac
> Task :react-native-safe-area-context:bundleLibRuntimeToDirRelease
> Task :expo-modules-core:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-nitro-modules:buildCMakeRelWithDebInfo[x86_64]
C/C++: ninja: Entering directory `/home/expo/workingdir/build/node_modules/react-native-nitro-modules/android/.cxx/RelWithDebInfo/721h6l3c/x86_64'
C/C++: /home/expo/workingdir/build/node_modules/react-native-nitro-modules/cpp/utils/ObjectUtils.cpp:51:110: warning: unused parameter 'allowCache' [-Wunused-parameter]
C/C++:    51 | void ObjectUtils::defineGlobal(jsi::Runtime& runtime, KnownGlobalPropertyName name, jsi::Value&& value, bool allowCache) {
C/C++:       |                                                                                                              ^
C/C++: 1 warning generated.
> Task :react-native-worklets:buildCMakeRelWithDebInfo[x86][worklets]
> Task :react-native-screens:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-screens:generateReleaseBuildConfig
> Task :react-native-screens:generateReleaseResValues
> Task :react-native-screens:generateReleaseResources
> Task :react-native-screens:packageReleaseResources
> Task :react-native-screens:parseReleaseLocalResources
> Task :react-native-screens:generateReleaseRFile
> Task :react-native-nitro-modules:externalNativeBuildRelease
> Task :react-native-nitro-modules:generateJsonModelRelease
> Task :react-native-nitro-modules:prefabReleaseConfigurePackage
> Task :expo-modules-core:buildCMakeRelWithDebInfo[x86_64]
> Task :app:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-nitro-modules:prefabReleasePackage
> Task :react-native-screens:compileReleaseKotlin
> Task :app:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :app:configureCMakeRelWithDebInfo[x86]
> Task :app:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-iap:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :expo-modules-core:mergeReleaseJniLibFolders
> Task :expo-modules-core:mergeReleaseNativeLibs
> Task :expo-modules-core:copyReleaseJniLibsProjectOnly
> Task :react-native-nitro-modules:mergeReleaseJniLibFolders
> Task :react-native-nitro-modules:mergeReleaseNativeLibs
> Task :react-native-nitro-modules:copyReleaseJniLibsProjectOnly
> Task :react-native-nitro-modules:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-nitro-modules:generateReleaseBuildConfig
> Task :react-native-nitro-modules:generateReleaseResValues
> Task :react-native-nitro-modules:generateReleaseResources
> Task :react-native-nitro-modules:packageReleaseResources
> Task :react-native-nitro-modules:parseReleaseLocalResources
> Task :react-native-nitro-modules:generateReleaseRFile
> Task :react-native-nitro-modules:compileReleaseKotlin
> Task :react-native-nitro-modules:javaPreCompileRelease
> Task :react-native-nitro-modules:compileReleaseJavaWithJavac
> Task :react-native-nitro-modules:bundleLibCompileToJarRelease
> Task :react-native-nitro-modules:bundleLibRuntimeToDirRelease
> Task :react-native-screens:javaPreCompileRelease
> Task :react-native-community_datetimepicker:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-community_datetimepicker:generateReleaseBuildConfig
> Task :react-native-community_datetimepicker:generateReleaseResValues
> Task :react-native-community_datetimepicker:generateReleaseResources
> Task :react-native-community_datetimepicker:packageReleaseResources
> Task :react-native-community_datetimepicker:parseReleaseLocalResources
> Task :react-native-community_datetimepicker:generateReleaseRFile
> Task :react-native-screens:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:56:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'name'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:57:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'reactContext'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:70:17 'constructor(name: String, className: String, canOverrideExistingModule: Boolean, needsEagerInit: Boolean, hasConstants: Boolean, isCxxModule: Boolean, isTurboModule: Boolean): ReactModuleInfo' is deprecated. This constructor is deprecated and will be removed in the future. Use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)].
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:48:77 Unchecked cast of '(CoordinatorLayout.Behavior<View!>?..CoordinatorLayout.Behavior<*>?)' to 'BottomSheetBehavior<Screen>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:383:36 'fun setTranslucent(screen: Screen, activity: Activity?, context: ReactContext?): Unit' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:402:36 'fun setColor(screen: Screen, activity: Activity?, context: ReactContext?): Unit' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:420:36 'fun setNavigationBarColor(screen: Screen, activity: Activity?): Unit' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:437:36 'fun setNavigationBarTranslucent(screen: Screen, activity: Activity?): Unit' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:217:31 'var targetElevation: Float' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:220:13 'fun setHasOptionsMenu(p0: Boolean): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:397:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:404:22 'fun onPrepareOptionsMenu(p0: Menu): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:407:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:412:22 'fun onCreateOptionsMenu(p0: Menu, p1: MenuInflater): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:435:18 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:203:14 'var statusBarColor: Int?' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:220:14 'var isStatusBarTranslucent: Boolean?' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:237:14 'var navigationBarColor: Int?' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:246:14 'var isNavigationBarTranslucent: Boolean?' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:55:42 'fun replaceSystemWindowInsets(p0: Int, p1: Int, p2: Int, p3: Int): WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:56:39 'val systemWindowInsetLeft: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:58:39 'val systemWindowInsetRight: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:59:39 'val systemWindowInsetBottom: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:102:53 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:106:37 'var statusBarColor: Int?' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:113:48 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:116:32 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:162:49 'var isStatusBarTranslucent: Boolean?' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:218:43 'var navigationBarColor: Int?' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:218:72 'var navigationBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:224:16 'var navigationBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:241:55 'var isNavigationBarTranslucent: Boolean?' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:283:13 'fun setColor(screen: Screen, activity: Activity?, context: ReactContext?): Unit' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:285:13 'fun setTranslucent(screen: Screen, activity: Activity?, context: ReactContext?): Unit' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:289:13 'fun setNavigationBarColor(screen: Screen, activity: Activity?): Unit' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:290:13 'fun setNavigationBarTranslucent(screen: Screen, activity: Activity?): Unit' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:354:42 'var statusBarColor: Int?' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:356:48 'var isStatusBarTranslucent: Boolean?' is deprecated. For apps targeting SDK 35 or above this prop has no effect because edge-to-edge is enabled by default and the status bar is always translucent.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:359:57 'var navigationBarColor: Int?' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:360:63 'var isNavigationBarTranslucent: Boolean?' is deprecated. For all apps targeting Android SDK 35 or above edge-to-edge is enabled by default.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:7:8 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:25:13 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:32:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'left'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:33:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'top'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:34:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'right'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:35:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'bottom'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:71:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:72:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:79:46 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:83:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:84:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:95:34 The corresponding parameter in the supertype 'RootView' is named 't'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:63:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:64:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:68:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:69:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/gamma/tabs/TabsHostViewManager.kt:37:9 The corresponding parameter in the supertype 'TabsHostViewManager' is named 'view'. This may cause problems when calling this function with named arguments.
> Task :react-native-community_datetimepicker:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialDatePickerModule.kt:21:20 'val currentActivity: Activity?' is deprecated. Deprecated in 0.80.0. Use getReactApplicationContext.getCurrentActivity() instead.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialDatePickerModule.kt:21:20 This synthetic property is based on the getter function 'fun getCurrentActivity(): Activity?' from Kotlin. In the future, synthetic properties will be available only if the base getter function came from Java. Consider replacing this property access with a 'getCurrentActivity()' function call.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialDatePickerModule.kt:26:20 'val currentActivity: Activity?' is deprecated. Deprecated in 0.80.0. Use getReactApplicationContext.getCurrentActivity() instead.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialDatePickerModule.kt:26:20 This synthetic property is based on the getter function 'fun getCurrentActivity(): Activity?' from Kotlin. In the future, synthetic properties will be available only if the base getter function came from Java. Consider replacing this property access with a 'getCurrentActivity()' function call.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialTimePickerModule.kt:22:20 'val currentActivity: Activity?' is deprecated. Deprecated in 0.80.0. Use getReactApplicationContext.getCurrentActivity() instead.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialTimePickerModule.kt:22:20 This synthetic property is based on the getter function 'fun getCurrentActivity(): Activity?' from Kotlin. In the future, synthetic properties will be available only if the base getter function came from Java. Consider replacing this property access with a 'getCurrentActivity()' function call.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialTimePickerModule.kt:27:20 'val currentActivity: Activity?' is deprecated. Deprecated in 0.80.0. Use getReactApplicationContext.getCurrentActivity() instead.
w: file:///home/expo/workingdir/build/node_modules/@react-native-community/datetimepicker/android/src/main/java/com/reactcommunity/rndatetimepicker/MaterialTimePickerModule.kt:27:20 This synthetic property is based on the getter function 'fun getCurrentActivity(): Activity?' from Kotlin. In the future, synthetic properties will be available only if the base getter function came from Java. Consider replacing this property access with a 'getCurrentActivity()' function call.
> Task :react-native-community_datetimepicker:javaPreCompileRelease
> Task :react-native-community_datetimepicker:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-community_datetimepicker:bundleLibRuntimeToDirRelease
> Task :react-native-screens:compileReleaseJavaWithJavac
> Task :react-native-screens:bundleLibRuntimeToDirRelease
> Task :react-native-google-signin_google-signin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-google-signin_google-signin:generateReleaseBuildConfig
> Task :react-native-google-signin_google-signin:generateReleaseResValues
> Task :react-native-google-signin_google-signin:generateReleaseResources
> Task :react-native-google-signin_google-signin:packageReleaseResources
> Task :react-native-google-signin_google-signin:parseReleaseLocalResources
> Task :react-native-google-signin_google-signin:generateReleaseRFile
> Task :react-native-google-signin_google-signin:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/@react-native-google-signin/google-signin/android/src/main/java/com/reactnativegooglesignin/ErrorDto.kt:3:8 'class GoogleSignInStatusCodes : CommonStatusCodes' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/@react-native-google-signin/google-signin/android/src/main/java/com/reactnativegooglesignin/ErrorDto.kt:23:31 Condition is always 'true'.
w: file:///home/expo/workingdir/build/node_modules/@react-native-google-signin/google-signin/android/src/main/java/com/reactnativegooglesignin/ErrorDto.kt:24:16 'class GoogleSignInStatusCodes : CommonStatusCodes' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/@react-native-google-signin/google-signin/android/src/main/java/com/reactnativegooglesignin/ErrorDto.kt:29:33 'class GoogleSignInStatusCodes : CommonStatusCodes' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/@react-native-google-signin/google-signin/android/src/main/java/com/reactnativegooglesignin/ErrorDto.kt:30:38 'class GoogleSignInStatusCodes : CommonStatusCodes' is deprecated. Deprecated in Java.
> Task :react-native-google-signin_google-signin:javaPreCompileRelease
> Task :react-native-iap:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-worklets:buildCMakeRelWithDebInfo[x86_64][worklets]
> Task :react-native-google-signin_google-signin:compileReleaseJavaWithJavac
> Task :react-native-google-signin_google-signin:bundleLibRuntimeToDirRelease
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /home/expo/workingdir/build/node_modules/@react-native-google-signin/google-signin/android/src/main/java/com/reactnativegooglesignin/RNGoogleSigninModule.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :expo:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo:generateReleaseBuildConfig
> Task :expo:generateReleaseResValues
> Task :expo:generateReleaseResources
> Task :expo:packageReleaseResources
> Task :expo:parseReleaseLocalResources
> Task :expo:generateReleaseRFile
> Task :expo-constants:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-constants:generateReleaseBuildConfig
> Task :expo-constants:generateReleaseResValues
> Task :expo-constants:generateReleaseResources
> Task :expo-constants:packageReleaseResources
> Task :expo-constants:parseReleaseLocalResources
> Task :expo-constants:generateReleaseRFile
> Task :expo-modules-core:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-modules-core:generateReleaseBuildConfig
> Task :expo-modules-core:generateReleaseResValues
> Task :expo-modules-core:generateReleaseResources
> Task :expo-modules-core:packageReleaseResources
> Task :expo-modules-core:parseReleaseLocalResources
> Task :expo-modules-core:generateReleaseRFile
> Task :expo-constants:javaPreCompileRelease
> Task :expo-dev-client:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-client:dataBindingMergeDependencyArtifactsRelease
> Task :expo-dev-client:generateReleaseResValues
> Task :expo-dev-client:generateReleaseResources
> Task :expo-dev-client:packageReleaseResources
> Task :expo-dev-client:parseReleaseLocalResources
> Task :expo-dev-client:dataBindingGenBaseClassesRelease
> Task :expo-modules-core:javaPreCompileRelease
> Task :expo-dev-client:generateReleaseBuildConfig
> Task :expo-dev-client:generateReleaseRFile
> Task :expo-dev-client:javaPreCompileRelease
> Task :expo-dev-launcher:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-launcher:dataBindingMergeDependencyArtifactsRelease
> Task :expo-dev-launcher:generateReleaseResValues
> Task :expo-dev-launcher:generateReleaseResources
> Task :expo-dev-launcher:packageReleaseResources
> Task :expo-dev-launcher:parseReleaseLocalResources
> Task :expo-dev-menu:generateReleaseResValues
> Task :expo-dev-menu:generateReleaseResources
> Task :expo-dev-menu:packageReleaseResources
> Task :expo-dev-menu:parseReleaseLocalResources
> Task :expo-dev-menu:generateReleaseRFile
> Task :expo-dev-menu-interface:generateReleaseResValues
> Task :expo-dev-menu-interface:generateReleaseResources
> Task :expo-dev-menu-interface:packageReleaseResources
> Task :expo-dev-menu-interface:parseReleaseLocalResources
> Task :expo-dev-menu-interface:generateReleaseRFile
> Task :expo-json-utils:generateReleaseResValues
> Task :expo-json-utils:generateReleaseResources
> Task :expo-json-utils:packageReleaseResources
> Task :expo-json-utils:parseReleaseLocalResources
> Task :expo-json-utils:generateReleaseRFile
> Task :expo-manifests:generateReleaseResValues
> Task :expo-manifests:generateReleaseResources
> Task :expo-manifests:packageReleaseResources
> Task :expo-manifests:parseReleaseLocalResources
> Task :expo-manifests:generateReleaseRFile
> Task :expo-updates-interface:generateReleaseResValues
> Task :expo-updates-interface:generateReleaseResources
> Task :expo-updates-interface:packageReleaseResources
> Task :expo-updates-interface:parseReleaseLocalResources
> Task :expo-updates-interface:generateReleaseRFile
> Task :expo-dev-launcher:dataBindingGenBaseClassesRelease
> Task :expo-dev-launcher:generateReleaseBuildConfig
> Task :expo-dev-launcher:generateReleaseRFile
> Task :expo-dev-launcher:checkApolloVersions
> Task :expo-dev-launcher:generateServiceApolloOptions
> Task :expo-dev-launcher:generateServiceApolloSources
w: /home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/graphql/GetBranches.graphql: (21, 11): Apollo: Use of deprecated field `runtimeVersion`
w: /home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/graphql/GetBranches.graphql: (34, 3): Apollo: Variable `platform` is unused
w: /home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/graphql/GetUpdates.graphql: (14, 11): Apollo: Use of deprecated field `runtimeVersion`
> Task :expo-dev-menu:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-menu:generateReleaseBuildConfig
> Task :expo-dev-menu-interface:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-menu-interface:generateReleaseBuildConfig
> Task :expo-dev-menu-interface:javaPreCompileRelease
> Task :expo-json-utils:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-json-utils:generateReleaseBuildConfig
> Task :expo-json-utils:javaPreCompileRelease
> Task :expo-manifests:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-manifests:generateReleaseBuildConfig
> Task :expo-manifests:javaPreCompileRelease
> Task :expo-dev-menu:javaPreCompileRelease
> Task :expo-updates-interface:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-updates-interface:generateReleaseBuildConfig
> Task :expo-updates-interface:javaPreCompileRelease
> Task :expo-dev-launcher:javaPreCompileRelease
> Task :expo-speech-recognition:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-speech-recognition:generateReleaseBuildConfig
> Task :expo-speech-recognition:generateReleaseResValues
> Task :expo-speech-recognition:generateReleaseResources
> Task :expo-speech-recognition:packageReleaseResources
> Task :expo-speech-recognition:parseReleaseLocalResources
> Task :expo-speech-recognition:generateReleaseRFile
> Task :expo-speech-recognition:javaPreCompileRelease
> Task :expo:javaPreCompileRelease
> Task :react-native-svg:bundleLibRuntimeToDirRelease
> Task :react-native-view-shot:generateReleaseBuildConfig
> Task :react-native-view-shot:generateReleaseResValues
> Task :react-native-view-shot:generateReleaseResources
> Task :react-native-view-shot:packageReleaseResources
> Task :react-native-view-shot:parseReleaseLocalResources
> Task :react-native-view-shot:generateReleaseRFile
> Task :react-native-view-shot:javaPreCompileRelease
> Task :react-native-view-shot:compileReleaseJavaWithJavac
> Task :react-native-view-shot:bundleLibRuntimeToDirRelease
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-async-storage_async-storage:generateReleaseBuildConfig
> Task :react-native-async-storage_async-storage:generateReleaseResValues
> Task :react-native-async-storage_async-storage:generateReleaseResources
> Task :react-native-async-storage_async-storage:packageReleaseResources
> Task :react-native-async-storage_async-storage:parseReleaseLocalResources
> Task :react-native-async-storage_async-storage:generateReleaseRFile
> Task :react-native-async-storage_async-storage:javaPreCompileRelease
> Task :react-native-async-storage_async-storage:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/javaPackage/java/com/reactnativecommunity/asyncstorage/AsyncStoragePackage.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :react-native-async-storage_async-storage:bundleLibRuntimeToDirRelease
> Task :expo-modules-core:compileReleaseKotlin
> Task :react-native-worklets:externalNativeBuildRelease
> Task :react-native-firebase_app:generateReleaseBuildConfig
> Task :react-native-firebase_app:generateReleaseResValues
> Task :react-native-firebase_app:generateReleaseResources
> Task :react-native-firebase_app:packageReleaseResources
> Task :react-native-firebase_app:parseReleaseLocalResources
> Task :react-native-firebase_app:generateReleaseRFile
> Task :react-native-firebase_app:javaPreCompileRelease
> Task :react-native-worklets:prefabReleasePackage
> Task :react-native-firebase_app:compileReleaseJavaWithJavac
> Task :react-native-worklets:mergeReleaseJniLibFolders
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-worklets:mergeReleaseNativeLibs
> Task :react-native-worklets:copyReleaseJniLibsProjectOnly
> Task :react-native-worklets:generateReleaseBuildConfig
> Task :react-native-worklets:generateReleaseResValues
> Task :react-native-worklets:generateReleaseResources
> Task :react-native-worklets:packageReleaseResources
> Task :react-native-worklets:parseReleaseLocalResources
> Task :react-native-worklets:generateReleaseRFile
> Task :react-native-worklets:javaPreCompileRelease
> Task :react-native-worklets:compileReleaseJavaWithJavac
> Task :react-native-worklets:bundleLibCompileToJarRelease
> Task :react-native-worklets:bundleLibRuntimeToDirRelease
Note: /home/expo/workingdir/build/node_modules/react-native-worklets/android/src/main/java/com/swmansion/worklets/WorkletsPackage.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :react-native-firebase_app:bundleLibCompileToJarRelease
> Task :react-native-firebase_auth:generateReleaseBuildConfig
> Task :react-native-firebase_auth:generateReleaseResValues
> Task :react-native-firebase_auth:generateReleaseResources
> Task :react-native-firebase_auth:packageReleaseResources
> Task :react-native-firebase_auth:parseReleaseLocalResources
> Task :react-native-firebase_auth:generateReleaseRFile
> Task :react-native-firebase_auth:javaPreCompileRelease
> Task :react-native-firebase_auth:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /home/expo/workingdir/build/node_modules/@react-native-firebase/auth/android/src/main/java/io/invertase/firebase/auth/ReactNativeFirebaseAuthModule.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :react-native-firebase_auth:bundleLibRuntimeToDirRelease
> Task :react-native-firebase_app:bundleLibRuntimeToDirRelease
> Task :sentry_react-native:generateReleaseBuildConfig
> Task :sentry_react-native:generateReleaseResValues
> Task :sentry_react-native:generateReleaseResources
> Task :sentry_react-native:packageReleaseResources
> Task :sentry_react-native:parseReleaseLocalResources
> Task :sentry_react-native:generateReleaseRFile
> Task :sentry_react-native:javaPreCompileRelease
> Task :sentry_react-native:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :sentry_react-native:bundleLibRuntimeToDirRelease
> Task :expo-modules-core:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/adapters/react/apploader/RNHeadlessAppLoader.kt:48:87 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/adapters/react/apploader/RNHeadlessAppLoader.kt:91:85 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/adapters/react/apploader/RNHeadlessAppLoader.kt:120:83 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/apploader/AppLoaderProvider.kt:34:52 Unchecked cast of 'Class<*>!' to 'Class<out HeadlessAppLoader>'.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:30:8 'typealias ErrorManagerModule = JSLoggerModule' is deprecated. Use JSLoggerModule instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:253:21 'typealias ErrorManagerModule = JSLoggerModule' is deprecated. Use JSLoggerModule instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:343:21 'val DEFAULT: Int' is deprecated. UIManagerType.DEFAULT will be deleted in the next release of React Native. Use [LEGACY] instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/defaultmodules/NativeModulesProxyModule.kt:16:5 'fun Constants(legacyConstantsProvider: () -> Map<String, Any?>): Unit' is deprecated. Use `Constant` or `Property` instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/PromiseImpl.kt:65:51 'val errorManager: JSLoggerModule?' is deprecated. Use AppContext.jsLogger instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/PromiseImpl.kt:69:22 'fun reportExceptionToLogBox(codedException: CodedException): Unit' is deprecated. Use appContext.jsLogger.error(...) instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewDefinitionBuilder.kt:464:16 'val errorManager: JSLoggerModule?' is deprecated. Use AppContext.jsLogger instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewDefinitionBuilder.kt:464:30 'fun reportExceptionToLogBox(codedException: CodedException): Unit' is deprecated. Use appContext.jsLogger.error(...) instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewManagerDefinition.kt:41:16 'val errorManager: JSLoggerModule?' is deprecated. Use AppContext.jsLogger instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewManagerDefinition.kt:41:30 'fun reportExceptionToLogBox(codedException: CodedException): Unit' is deprecated. Use appContext.jsLogger.error(...) instead.
> Task :app:checkReleaseDuplicateClasses
> Task :app:buildKotlinToolingMetadata
> Task :app:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :app:generateReleaseBuildConfig
> Task :expo:writeReleaseAarMetadata
> Task :expo-constants:writeReleaseAarMetadata
> Task :expo-dev-client:writeReleaseAarMetadata
> Task :expo-dev-launcher:writeReleaseAarMetadata
> Task :expo-dev-menu:writeReleaseAarMetadata
> Task :expo-dev-menu-interface:writeReleaseAarMetadata
> Task :expo-json-utils:writeReleaseAarMetadata
> Task :expo-manifests:writeReleaseAarMetadata
> Task :expo-speech-recognition:writeReleaseAarMetadata
> Task :expo-updates-interface:writeReleaseAarMetadata
> Task :react-native-async-storage_async-storage:writeReleaseAarMetadata
> Task :react-native-community_datetimepicker:writeReleaseAarMetadata
> Task :react-native-firebase_app:writeReleaseAarMetadata
> Task :react-native-firebase_auth:writeReleaseAarMetadata
> Task :react-native-gesture-handler:writeReleaseAarMetadata
> Task :react-native-google-signin_google-signin:writeReleaseAarMetadata
> Task :react-native-nitro-modules:writeReleaseAarMetadata
> Task :react-native-safe-area-context:writeReleaseAarMetadata
> Task :react-native-screens:writeReleaseAarMetadata
> Task :react-native-svg:writeReleaseAarMetadata
> Task :react-native-view-shot:writeReleaseAarMetadata
> Task :react-native-worklets:writeReleaseAarMetadata
> Task :sentry_react-native:writeReleaseAarMetadata
> Task :expo-modules-core:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-reanimated:buildCMakeRelWithDebInfo[arm64-v8a][reanimated]
> Task :expo-modules-core:bundleLibCompileToJarRelease
> Task :app:createBundleReleaseJsAndAssets
React Compiler enabled
Starting Metro Bundler
> Task :expo-constants:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-constants/android/src/main/java/expo/modules/constants/ConstantsModule.kt:12:5 'fun Constants(legacyConstantsProvider: () -> Map<String, Any?>): Unit' is deprecated. Use `Constant` or `Property` instead.
> Task :expo-constants:compileReleaseJavaWithJavac
> Task :expo-constants:bundleLibCompileToJarRelease
> Task :expo-dev-client:compileReleaseKotlin NO-SOURCE
> Task :expo-dev-client:compileReleaseJavaWithJavac
> Task :expo-dev-client:bundleLibCompileToJarRelease
> Task :expo-dev-menu-interface:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu-interface/android/src/main/java/expo/interfaces/devmenu/DevMenuInterfacePackage.kt:14:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu-interface/android/src/main/java/expo/interfaces/devmenu/ReactHostWrapper.kt:5:8 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu-interface/android/src/main/java/expo/interfaces/devmenu/ReactHostWrapper.kt:19:41 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu-interface/android/src/main/java/expo/interfaces/devmenu/ReactHostWrapper.kt:20:33 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
> Task :expo-dev-menu-interface:compileReleaseJavaWithJavac
> Task :expo-dev-menu-interface:bundleLibCompileToJarRelease
> Task :expo-json-utils:compileReleaseKotlin
> Task :expo-json-utils:compileReleaseJavaWithJavac
> Task :expo-json-utils:bundleLibCompileToJarRelease
> Task :expo-manifests:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-manifests/android/src/main/java/expo/modules/manifests/core/EmbeddedManifest.kt:19:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo-manifests/android/src/main/java/expo/modules/manifests/core/EmbeddedManifest.kt:19:86 'fun getLegacyID(): String' is deprecated. Prefer scopeKey or projectId depending on use case.
w: file:///home/expo/workingdir/build/node_modules/expo-manifests/android/src/main/java/expo/modules/manifests/core/ExpoUpdatesManifest.kt:16:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo-manifests/android/src/main/java/expo/modules/manifests/core/Manifest.kt:13:3 Deprecations and opt-ins on a method overridden from 'Any' may not be reported.
w: file:///home/expo/workingdir/build/node_modules/expo-manifests/android/src/main/java/expo/modules/manifests/core/Manifest.kt:15:12 'fun getRawJson(): JSONObject' is deprecated. Prefer to use specific field getters.
> Task :expo-manifests:compileReleaseJavaWithJavac
> Task :expo-manifests:bundleLibCompileToJarRelease
> Task :app:createBundleReleaseJsAndAssets
Android node_modules/expo-router/entry.js ░░░░░░░░░░░░░░░░  0.0% (0/1)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓░░░░░░░░░ 44.7% ( 740/1258)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 84.7% (1824/1982)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 99.9% (2508/2508)
Android Bundled 12045ms node_modules/expo-router/entry.js (2508 modules)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 99.9% (2508/2508)
Writing bundle output to: /home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle
Writing sourcemap output to: /home/expo/workingdir/build/android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
Copying 64 asset files
Done writing bundle output
Done writing sourcemap output
> Task :expo-dev-menu:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/com/facebook/react/devsupport/DevMenuSettingsBase.kt:6:8 'class PreferenceManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/com/facebook/react/devsupport/DevMenuSettingsBase.kt:18:51 'class PreferenceManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/com/facebook/react/devsupport/DevMenuSettingsBase.kt:18:69 'static fun getDefaultSharedPreferences(p0: Context!): SharedPreferences!' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/com/facebook/react/devsupport/DevMenuSettingsBase.kt:51:13 This code uses error suppression for 'NOTHING_TO_OVERRIDE'. While it might compile and work, the compiler behavior is UNSPECIFIED and WILL NOT BE PRESERVED. Please report your use case to the Kotlin issue tracker instead: https://kotl.in/issue
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/com/facebook/react/devsupport/DevMenuSettingsBase.kt:58:13 This code uses error suppression for 'NOTHING_TO_OVERRIDE'. While it might compile and work, the compiler behavior is UNSPECIFIED and WILL NOT BE PRESERVED. Please report your use case to the Kotlin issue tracker instead: https://kotl.in/issue
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/expo/modules/devmenu/DevMenuPackage.kt:28:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/main/java/expo/modules/devmenu/DevMenuPackage.kt:47:78 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-menu/android/src/release/java/expo/modules/devmenu/DevMenuManager.kt:80:43 The corresponding parameter in the supertype 'DevMenuManagerInterface' is named 'shouldAutoLaunch'. This may cause problems when calling this function with named arguments.
> Task :react-native-iap:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :expo-dev-menu:compileReleaseJavaWithJavac
> Task :expo-dev-menu:bundleLibCompileToJarRelease
> Task :expo-updates-interface:compileReleaseKotlin
> Task :expo-updates-interface:compileReleaseJavaWithJavac
> Task :expo-updates-interface:bundleLibCompileToJarRelease
> Task :expo-dev-launcher:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/DevLauncherPackage.kt:15:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/DevLauncherRecentlyOpenedAppsRegistry.kt:33:47 Unchecked cast of 'MutableMap<Any?, Any?>' to 'MutableMap<String, Any>'.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/DevLauncherRecentlyOpenedAppsRegistry.kt:51:27 'fun getRawJson(): JSONObject' is deprecated. Prefer to use specific field getters.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:37:23 'constructor(p0: String!, p1: Bitmap!, p2: Int): ActivityManager.TaskDescription' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:63:61 'static field FLAG_TRANSLUCENT_STATUS: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:92:45 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:95:68 'static field SYSTEM_UI_FLAG_LIGHT_STATUS_BAR: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:99:67 'static field SYSTEM_UI_FLAG_LIGHT_STATUS_BAR: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:103:67 'static field SYSTEM_UI_FLAG_LIGHT_STATUS_BAR: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:107:15 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:115:59 'static field FLAG_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:116:61 'static field FLAG_FORCE_NOT_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:118:59 'static field FLAG_FORCE_NOT_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:119:61 'static field FLAG_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:131:23 'fun replaceSystemWindowInsets(p0: Int, p1: Int, p2: Int, p3: Int): WindowInsets' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:132:25 'val systemWindowInsetLeft: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:134:25 'val systemWindowInsetRight: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:135:25 'val systemWindowInsetBottom: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:150:15 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:160:63 'static field FLAG_TRANSLUCENT_NAVIGATION: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:161:25 'var navigationBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:171:63 'static field FLAG_TRANSLUCENT_NAVIGATION: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:175:33 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:176:33 'static field SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:177:21 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:190:29 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:191:62 'static field SYSTEM_UI_FLAG_HIDE_NAVIGATION: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:191:101 'static field SYSTEM_UI_FLAG_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:192:63 'static field SYSTEM_UI_FLAG_HIDE_NAVIGATION: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:192:102 'static field SYSTEM_UI_FLAG_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:192:136 'static field SYSTEM_UI_FLAG_IMMERSIVE: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:193:70 'static field SYSTEM_UI_FLAG_HIDE_NAVIGATION: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:193:109 'static field SYSTEM_UI_FLAG_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:193:143 'static field SYSTEM_UI_FLAG_IMMERSIVE_STICKY: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/main/java/expo/modules/devlauncher/launcher/configurators/DevLauncherExpoActivityConfigurator.kt:196:17 'var systemUiVisibility: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/release/java/expo/modules/devlauncher/DevLauncherController.kt:111:81 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/release/java/expo/modules/devlauncher/launcher/DevLauncherReactNativeHost.kt:4:8 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-dev-launcher/android/src/release/java/expo/modules/devlauncher/launcher/DevLauncherReactNativeHost.kt:8:83 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
> Task :react-native-iap:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :expo-dev-launcher:compileReleaseJavaWithJavac
> Task :expo-dev-launcher:bundleLibCompileToJarRelease
> Task :expo-dev-launcher:bundleLibRuntimeToDirRelease
> Task :expo-speech-recognition:compileReleaseKotlin
> Task :expo-speech-recognition:compileReleaseJavaWithJavac
> Task :expo-speech-recognition:bundleLibCompileToJarRelease
> Task :expo-dev-menu:bundleLibRuntimeToDirRelease
> Task :expo-dev-menu-interface:bundleLibRuntimeToDirRelease
> Task :expo-speech-recognition:bundleLibRuntimeToDirRelease
> Task :expo:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ExpoModulesPackage.kt:34:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ExpoReactHostFactory.kt:8:8 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ExpoReactHostFactory.kt:80:22 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:24:8 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:58:33 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:105:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:105:38 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:113:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:114:21 'val reactInstanceManager: ReactInstanceManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:168:36 'constructor(activity: Activity, reactNativeHost: ReactNativeHost?, appKey: String?, launchOptions: Bundle?, fabricEnabled: Boolean): ReactDelegate' is deprecated. Deprecated since 0.81.0, use one of the other constructors instead.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:279:77 'val reactInstanceManager: ReactInstanceManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:282:22 'val reactInstanceManager: ReactInstanceManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:286:54 'val reactInstanceManager: ReactInstanceManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapper.kt:6:8 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapper.kt:15:9 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapper.kt:47:60 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapperBase.kt:7:8 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapperBase.kt:16:23 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapperBase.kt:89:16 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactNativeHostWrapperBase.kt:101:38 'class ReactNativeHost : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/fetch/ExpoFetchModule.kt:30:39 'constructor(reactContext: ReactContext): ForwardingCookieHandler' is deprecated. Use the default constructor.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/fetch/NativeResponse.kt:42:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/fetch/NativeResponse.kt:44:11 'fun deallocate(): Unit' is deprecated. Use sharedObjectDidRelease() instead.
> Task :expo-modules-core:bundleLibRuntimeToDirRelease
> Task :expo:compileReleaseJavaWithJavac
> Task :expo:bundleLibRuntimeToDirRelease
> Task :expo-constants:bundleLibRuntimeToDirRelease
> Task :expo-dev-client:bundleLibRuntimeToDirRelease
> Task :expo-manifests:bundleLibRuntimeToDirRelease
> Task :expo-json-utils:bundleLibRuntimeToDirRelease
> Task :expo-updates-interface:bundleLibRuntimeToDirRelease
> Task :expo-modules-core:writeReleaseAarMetadata
> Task :app:createBundleReleaseJsAndAssets_SentryUpload_com.standalonetaskmanager.app@1.0.0+1_1
Copy `debugId` from packager source map to Hermes source map...
Done.
Check generated source map for Debug ID: 94206d86-ab4b-4e8a-8ac0-d780d4245741
Sentry Source Maps upload will include the release name and dist.
Sentry-CLI arguments: [/home/expo/workingdir/build/node_modules/@sentry/cli/bin/sentry-cli, react-native, gradle, --bundle, /home/expo/workingdir/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle, --sourcemap, /home/expo/workingdir/build/android/app/build/generated/sourcemaps/react/release/index.android.bundle.map, --release, com.standalonetaskmanager.app@1.0.0+1, --dist, 1]
INFO    2026-02-18 15:57:35.792678383 +00:00 Loaded file referenced by SENTRY_PROPERTIES (/home/expo/workingdir/build/android/sentry.properties)
Processing react-native sourcemaps for Sentry upload.
> Analyzing 2 sources
> Rewriting sources
> Adding source map references
error: Auth token is required for this request. Please run `sentry-cli login` and try again!
Add --log-level=[info|debug] or export SENTRY_LOG_LEVEL=[info|debug] to see more output.
Please attach the full debug log to all bug reports.
> Task :app:createBundleReleaseJsAndAssets_SentryUpload_com.standalonetaskmanager.app@1.0.0+1_1 FAILED
> Task :app:createBundleReleaseJsAndAssets_SentryUploadCleanUp SKIPPED
[Incubating] Problems report is available at: file:///home/expo/workingdir/build/android/build/reports/problems/problems-report.html
Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.
You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.
For more on this, please refer to https://docs.gradle.org/8.14.3/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
466 actionable tasks: 466 executed
FAILURE: Build failed with an exception.
* Where:
Script '/home/expo/workingdir/build/node_modules/@sentry/react-native/sentry.gradle' line: 149
* What went wrong:
Execution failed for task ':app:createBundleReleaseJsAndAssets_SentryUpload_com.standalonetaskmanager.app@1.0.0+1_1'.
> Process 'command '/home/expo/workingdir/build/node_modules/@sentry/cli/bin/sentry-cli'' finished with non-zero exit value 1
* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.
BUILD FAILED in 9m 58s
Error: Gradle build failed with unknown error. See logs for the "Run gradlew" phase for more information.