package com.wolf.zero.rnmodule;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;


/**
 * Created by zerowolf on 2018/1/4.
 */

public class BGNativeExampleModule extends ReactContextBaseJavaModule {

    @Override
    public String getName() {
        return "BGNativeExampleModule";
    }

    @ReactMethod
    public void testPrint(String name, ReadableMap info) {
        Log.i(TAG, name+"haha");
        Log.i(TAG, info.toString());

    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("BGModuleName", "BGNativeModuleExample");
        constants.put("TestEventName", "TestEventName");
        return constants;
    }

    @ReactMethod
    public void getNativeClass(Callback callback) {
        callback.invoke("BGNativeExampleModule");
    }

    @ReactMethod
    public void testPromises(Boolean isResolve, Promise promise) {
        if (isResolve) {
            promise.resolve(isResolve.toString());
        } else {
            promise.reject(isResolve.toString());
        }
    }

    protected static final String TAG = BGNativeExampleModule.class.getSimpleName();
    private static final  String TestEventName = "TestEventName";
    private Timer timer;
    public BGNativeExampleModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        //开启定时器
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                //发送事件
                WritableMap params = Arguments.createMap();
                params.putString("name", "Jack");
                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(TestEventName, params);
            }
        };
        timer = new Timer();
        timer.schedule(task, 1000, 1000);

        reactContext.addActivityEventListener(new BaseActivityEventListener());
    }



}



