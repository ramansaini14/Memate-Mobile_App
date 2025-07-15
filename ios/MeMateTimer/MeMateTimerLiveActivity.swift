//
//  MeMateTimerLiveActivity.swift
//  MeMateTimer
//
//  Created by Anuj Nagpal on 14/07/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct MeMateTimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
      var startTime: Date
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

@available(iOS 16.1,*)
struct MeMateTimerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: MeMateTimerAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("MeMate Timer")
                    .font(.headline)
              TimelineView(.periodic(from: context.state.startTime, by: 1)) { timelineContext in
                    Text(timerInterval: context.state.startTime...timelineContext.date, countsDown: false)
                        .font(.title2)
                        .monospacedDigit()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .padding()
            .background(Color.black)
            .foregroundColor(.white)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("MeMate")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    TimelineView(.periodic(from: context.state.startTime, by: 1)) { timelineContext in
                        Text(timerInterval: context.state.startTime...timelineContext.date, countsDown: false)
                            .font(.subheadline)
                            .monospacedDigit()
                            .foregroundColor(.white)
                            .frame(width: 70, alignment: .center)
                            .padding(4)
                            .background(Color.black)
                            .clipShape(RoundedRectangle(cornerRadius: 6))
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                  TimelineView(.periodic(from: context.state.startTime, by: 1)) { timelineContext in
                        Text(timerInterval: context.state.startTime...timelineContext.date, countsDown: false)
                            .font(.subheadline)
                            .monospacedDigit()
                            .foregroundColor(.white)
                            .frame(width: 70, alignment: .center)
                            .padding(4)
                            .background(Color.black)
                            .clipShape(RoundedRectangle(cornerRadius: 6))
                    }
                    // more content
                }
            } compactLeading: {
                // Text("")
                    Image(systemName: "timer")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 20, height: 20)
            } compactTrailing: {
              TimelineView(.periodic(from: context.state.startTime, by: 1)) { timelineContext in
                    Text(timerInterval: context.state.startTime...timelineContext.date, countsDown: false)
                        .font(.subheadline)
                        .monospacedDigit()
                        .foregroundColor(.white)
                        .frame(width: 70, alignment: .center)
                        .padding(4)
                        .background(Color.black)
                        .clipShape(RoundedRectangle(cornerRadius: 6))
                }
            } minimal: {
                TimelineView(.periodic(from: context.state.startTime, by: 1)) { timelineContext in
                    Text(timerInterval: context.state.startTime...timelineContext.date, countsDown: false)
                        .font(.caption2)
                        .monospacedDigit()
                        .foregroundColor(.white)
                        .padding(6)
                        .background(Color.black)
                        .clipShape(Capsule())
                }
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension MeMateTimerAttributes {
    fileprivate static var preview: MeMateTimerAttributes {
        MeMateTimerAttributes(name: "World")
    }
}

extension MeMateTimerAttributes.ContentState {
    fileprivate static var smiley: MeMateTimerAttributes.ContentState {
//        MeMateTimerAttributes.ContentState(emoji: "😀")
      MeMateTimerAttributes.ContentState(emoji: "😀", startTime: Date())
     }
     
     fileprivate static var starEyes: MeMateTimerAttributes.ContentState {
       MeMateTimerAttributes.ContentState(emoji: "🤩", startTime: Date())
     }
}
//
//#Preview("Notification", as: .content, using: MeMateTimerAttributes.preview) {
//   MeMateTimerLiveActivity()
//} contentStates: {
//    MeMateTimerAttributes.ContentState.smiley
//    MeMateTimerAttributes.ContentState.starEyes
//}
