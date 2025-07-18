//
//  MeMateTimerModule.swift
//  MeMate
//
//  Created by Anuj Nagpal on 14/07/25.
//

import Foundation
import ActivityKit
import React

@available(iOS 16.2, *)
@objc(MeMateTimer)
public class MeMateTimer: NSObject {
    private var currentActivity: Activity<MeMateTimerAttributes>?
    
    // Check if Live Activities are enabled for the app
    private func areActivitiesEnabled() -> Bool {
        return ActivityAuthorizationInfo().areActivitiesEnabled
    }
    
    @objc(startTimer:withResolver:withRejecter:)
    func startTimer(seconds: Double, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        // Check if Live Activities are enabled
        guard areActivitiesEnabled() else {
            reject("LIVE_ACTIVITIES_DISABLED", "Live Activities are disabled for this app", nil)
            return
        }
        
        // Calculate the start time based on current elapsed seconds
        let startTime = Date().addingTimeInterval(-seconds)
        
        // Prepare the activity attributes and content state
        let attributes = MeMateTimerAttributes(name: "MeMate")
        let contentState = MeMateTimerAttributes.ContentState(startTime: startTime)
        
        Task {
            do {
                // End any existing activities first
                await endAllActivities()
                
                // Start new Live Activity
                currentActivity = try Activity<MeMateTimerAttributes>.request(
                    attributes: attributes,
                    contentState: contentState,
                    pushType: nil
                )
                
                DispatchQueue.main.async {
                    resolve("Live Activity started successfully")
                }
                
            } catch {
                DispatchQueue.main.async {
                    reject("START_ERROR", "Failed to start Live Activity: \(error.localizedDescription)", error)
                }
            }
        }
    }
    
    @objc(updateTimer:withResolver:withRejecter:)
    func updateTimer(seconds: Double, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let activity = currentActivity else {
            reject("NO_ACTIVITY", "No active Live Activity to update", nil)
            return
        }
        
        // Calculate updated start time
        let startTime = Date().addingTimeInterval(-seconds)
        let updatedContentState = MeMateTimerAttributes.ContentState(startTime: startTime)
        
        Task {
            do {
                await activity.update(ActivityContent(state: updatedContentState, staleDate: nil))
                DispatchQueue.main.async {
                    resolve("Live Activity updated successfully")
                }
            }
          catch {
                DispatchQueue.main.async {
                    reject("UPDATE_ERROR", "Failed to update Live Activity: \(error.localizedDescription)", error)
                }
            }
        }
    }
    
    @objc(stopTimer:withRejecter:)
    func stopTimer(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        Task {
            await endAllActivities()
            currentActivity = nil
            
            DispatchQueue.main.async {
                resolve("Live Activity stopped successfully")
            }
        }
    }
    
    // Helper method to end all activities
    private func endAllActivities() async {
        for activity in Activity<MeMateTimerAttributes>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }
    
    @objc(isActivityRunning:withRejecter:)
    func isActivityRunning(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let isRunning = currentActivity != nil && Activity<MeMateTimerAttributes>.activities.count > 0
        resolve(isRunning)
    }
}
