package com.mymusic;
import android.os.Bundle; //<--添加这一句
import org.devio.rn.splashscreen.SplashScreen; //<--添加这一句

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);  // <--添加这一句
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "myMusic";
    }
}
