//
//  MeMateTimerLiveActivity.swift
//  MeMate
//
//  Created by Anuj Nagpal on 14/07/25.
//

import Foundation
import ActivityKit
import React
import SwiftUI

@objc(MeMateTimer)
public class MeMateTimer: NSObject {
  
  @objc(startTimer:withSeconds:withResolver:withRejecter:)
  func startTimer(emoji: String, seconds: Double, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    print("Timer started from \(seconds) seconds ago")
    if #available(iOS 16.1, *) {
      do {
        let startTime = Date().addingTimeInterval(-seconds)
        let attributes = MeMateTimerAttributes(name: "MeMate")
//        let contentState = MeMateTimerAttributes.ContentState(emoji: emoji)

        let contentState = MeMateTimerAttributes.ContentState(emoji: emoji, startTime: startTime)
        let _ = try Activity<MeMateTimerAttributes>.request(
          attributes: attributes,
          contentState: contentState,
          pushType: nil
        )
        resolve("Live Activity started with \(emoji) from \(seconds) seconds")
      } catch {
        reject("start_error", "Failed to start Live Activity", error)
      }
    } else {
      reject("unsupported", "Live Activities are not supported on this iOS version.", nil)
    }
  }
  
  @objc(endTimer)
  func endTimer() {
    print("Ending Timer")
    if #available(iOS 16.1, *) {
      Task {
        for activity in Activity<MeMateTimerAttributes>.activities {
          await activity.end()
        }
      }
    } else {
      print("Live Activities are not supported on this iOS version.")
    }
  }
}
