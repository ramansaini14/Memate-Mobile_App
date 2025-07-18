//
//  MeMateTimerBundle.swift
//  MeMateTimer
//
//  Created by Anuj Nagpal on 14/07/25.
//

import WidgetKit
import SwiftUI

@main
struct MeMateTimerBundle: WidgetBundle {
    var body: some Widget {
        // Only include Live Activity - no regular widgets needed
        if #available(iOS 16.2, *) {
            MeMateTimerLiveActivity()
        }
    }
}
