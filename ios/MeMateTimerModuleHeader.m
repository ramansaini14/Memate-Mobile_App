//
//  MeMateTimerModuleHeader.m
//  MeMate
//
//  Created by Anuj Nagpal on 14/07/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MeMateTimer, NSObject)

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

RCT_EXTERN_METHOD(startTimer:(double)seconds jobId:(NSString *)jobId jobName:(NSString *)jobName withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(updateTimer:(double)seconds jobId:(NSString *)jobId jobName:(NSString *)jobName withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopTimer:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isActivityRunning:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

@end
