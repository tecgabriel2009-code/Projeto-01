# Regras ProGuard para o APK Gestão Industrial
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-dontwarn androidx.webkit.**
