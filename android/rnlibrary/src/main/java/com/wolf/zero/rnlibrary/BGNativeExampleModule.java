package com.wolf.zero.rnlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Created by zerowolf on 2018/1/4.
 */

public class BGNativeExampleModule extends ReactContextBaseJavaModule {
    private static final String TAG = "BGNativeExampleModule";
    public BGNativeExampleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BGNativeExampleModule";
    }

}



