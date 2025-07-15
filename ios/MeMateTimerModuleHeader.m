//
//  MeMateTimerModuleHeader.m
//  MeMate
//
//  Created by Anuj Nagpal on 14/07/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MeMateTimer, NSObject)

RCT_EXTERN_METHOD(startTimer:(NSString *)emoji withSeconds:(double)seconds withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(endTimer)

@end
