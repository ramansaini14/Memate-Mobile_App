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
        MeMateTimer()
        MeMateTimerControl()
        MeMateTimerLiveActivity()
    }
}
