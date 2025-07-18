import ActivityKit
import WidgetKit
import SwiftUI

struct MeMateTimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var startTime: Date
        
        // Helper function to calculate time interval since now
        func getTimeIntervalSinceNow() -> Double {
            return startTime.timeIntervalSince1970 - Date().timeIntervalSince1970
        }
    }
    
    // Fixed non-changing properties - keeping it minimal
    var name: String
}

@available(iOS 16.2, *)
struct MeMateTimerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: MeMateTimerAttributes.self) { context in
            // Lock screen/banner UI - Clean and beautiful design
            VStack(spacing: 8) {
                HStack {
                    Image(systemName: "timer")
                        .foregroundColor(.white)
                        .font(.title2)
                    
                    Text("Timer")
                        .font(.headline)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                    
                    Spacer()
                    
                    Text(
                        Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
                        style: .timer
                    )
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.cyan)
                    .monospacedDigit()
                }
                
                Text("Memate Job Running 🫠")
                    .font(.caption)
                    .bold(true)
                    .foregroundColor(.white.opacity(0.9))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .frame(maxWidth: .infinity)
            .activityBackgroundTint(Color.black.opacity(0.8))
            .activitySystemActionForegroundColor(Color.white)
            
        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI - Centered timer with beautiful design
                DynamicIslandExpandedRegion(.center) {
                    VStack(spacing: 12) {
                        Text("MeMate Job Timer")
                            .font(.headline)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                        
                        HStack {
                            Image(systemName: "timer")
                                .foregroundColor(.cyan)
                                .font(.title2)
                            
                            Text(
                                Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
                                style: .timer
                            )
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.cyan)
                            .monospacedDigit()
                        }
                    }
                    .padding(.vertical, 8)
                }
                
                // Bottom region for future controls (pause/stop buttons)
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Tap to open app")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .padding(.bottom, 4)
                }
                
            } compactLeading: {
                // Compact leading - Timer icon
                Image(systemName: "timer")
                    .imageScale(.medium)
                    .foregroundColor(.cyan)
                    .padding(.leading, 4)
                    
            } compactTrailing: {
                // Compact trailing - Timer count
                Text(
                    Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
                    style: .timer
                )
                .foregroundColor(.cyan)
                .font(.system(size: 14, weight: .semibold, design: .monospaced))
                .fontWeight(.semibold)
                .monospacedDigit()
                .frame(minWidth: 45, maxWidth: 60)
                .minimumScaleFactor(0.8)
                .lineLimit(1)
                .padding(.trailing, 4)
                
            } minimal: {
                // Minimal - Just the timer icon
                Image(systemName: "timer")
                    .imageScale(.small)
                    .foregroundColor(.cyan)
            }
            .widgetURL(URL(string: "memate://timer"))
            .keylineTint(Color.cyan)
        }
    }
}
