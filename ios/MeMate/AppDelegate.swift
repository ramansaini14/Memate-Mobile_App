import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UserNotifications
import BackgroundTasks
// import PushNotificationIOS // Only needed for advanced push handling

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "MeMate",
      in: window,
      launchOptions: launchOptions
    )

    // ✅ Set UNUserNotificationCenter delegate
    UNUserNotificationCenter.current().delegate = self

    // Register background task
    BGTaskScheduler.shared.register(
      forTaskWithIdentifier: "com.sarswatech.MeMate.MeMateTimer",
      using: nil
    ) { task in
      self.handleTimerTask(task: task as! BGProcessingTask)
    }

    return true
  }

  func handleTimerTask(task: BGProcessingTask) {
    task.expirationHandler = {
      task.setTaskCompleted(success: false)
    }

    // Schedule next background task
    scheduleBackgroundTask()

    // Your background task logic here
    task.setTaskCompleted(success: true)
  }

  func scheduleBackgroundTask() {
    let request = BGProcessingTaskRequest(identifier: "com.sarswatech.MeMate.MeMateTimer")
    request.requiresNetworkConnectivity = false
    request.requiresExternalPower = false

    do {
      try BGTaskScheduler.shared.submit(request)
    } catch {
      print("Could not schedule background task: \(error)")
    }
  }

  // Prevent Live Activities from being ended when app terminates
  func applicationWillTerminate(_ application: UIApplication) {
    // Do NOT end Live Activities here - they should persist after app termination
    print("App terminating - Live Activities will continue running")
  }

  // ✅ Handle notification while app is in foreground
  func userNotificationCenter(_ center: UNUserNotificationCenter,
                              willPresent notification: UNNotification,
                              withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    completionHandler([.alert, .sound, .badge])
  }

  // ✅ Handle tap on notification
  func userNotificationCenter(_ center: UNUserNotificationCenter,
                              didReceive response: UNNotificationResponse,
                              withCompletionHandler completionHandler: @escaping () -> Void) {
    completionHandler()
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}