import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  Check,
  Clock,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  Trash2,
  Volume2,
} from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/notifications")({
  component: NotificationsPage,
});

interface Notification {
  id: number;
  type: "security" | "activity" | "system" | "reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  category: string;
}

function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showRead, setShowRead] = useState(true);

  // Notification preferences state
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    inApp: true,
    security: true,
    activity: true,
    system: false,
    reminders: true,
  });

  // Sample notifications data
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "security",
      title: "New login detected",
      message: "A new device signed in to your account from San Francisco, CA",
      timestamp: "2 minutes ago",
      read: false,
      priority: "high",
      category: "Security",
    },
    {
      id: 2,
      type: "activity",
      title: "Scrapebook updated",
      message: "Your scrapbook 'Summer Vacation 2024' was updated",
      timestamp: "1 hour ago",
      read: false,
      priority: "medium",
      category: "Activity",
    },
    {
      id: 3,
      type: "reminder",
      title: "Backup reminder",
      message: "Don't forget to backup your scrapbooks this week",
      timestamp: "3 hours ago",
      read: true,
      priority: "low",
      category: "Reminders",
    },
    {
      id: 4,
      type: "system",
      title: "System maintenance",
      message: "Scheduled maintenance will occur tonight at 2 AM",
      timestamp: "1 day ago",
      read: true,
      priority: "medium",
      category: "System",
    },
    {
      id: 5,
      type: "security",
      title: "Password changed",
      message: "Your account password was successfully updated",
      timestamp: "2 days ago",
      read: true,
      priority: "high",
      category: "Security",
    },
    {
      id: 6,
      type: "activity",
      title: "New scrapbook created",
      message: "You created a new scrapbook 'Family Photos'",
      timestamp: "3 days ago",
      read: true,
      priority: "low",
      category: "Activity",
    },
  ]);

  const handlePreferenceToggle = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleMarkAsRead = (id: number) => {
    // Handle mark as read logic here
    console.log(`Marking notification ${id} as read`);
  };

  const handleDeleteNotification = (id: number) => {
    // Handle delete logic here
    console.log(`Deleting notification ${id}`);
  };

  const handleMarkAllAsRead = () => {
    // Handle mark all as read logic here
    console.log("Marking all notifications as read");
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || notification.category === selectedCategory;
    const matchesReadStatus = showRead || !notification.read;

    return matchesSearch && matchesCategory && matchesReadStatus;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const categories = [
    "all",
    ...Array.from(new Set(notifications.map((n) => n.category))),
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4 text-red-600" />;
      case "activity":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case "system":
        return <Settings className="h-4 w-4 text-gray-600" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage your notifications and preferences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {unreadCount} unread
          </Badge>
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>
                View and manage all your notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="show-read"
                      checked={showRead}
                      onChange={(e) => setShowRead(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="show-read" className="text-sm">
                      Show read
                    </Label>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BellOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications found</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                        notification.read ? "bg-muted/30" : "bg-background"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4
                                className={`font-medium ${notification.read ? "text-muted-foreground" : ""}`}
                              >
                                {notification.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getPriorityColor(notification.priority)}`}
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            <p
                              className={`text-sm ${notification.read ? "text-muted-foreground" : ""}`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {notification.timestamp}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {notification.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Mark as read
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteNotification(notification.id)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>
                {unreadCount} unread notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border p-4 bg-background"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {notification.category}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Delivery Methods */}
              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={preferences.email}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("email", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your device
                      </p>
                    </div>
                    <Switch
                      checked={preferences.push}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("push", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        In-App Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications within the application
                      </p>
                    </div>
                    <Switch
                      checked={preferences.inApp}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("inApp", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Types */}
              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Security Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Login attempts, password changes, suspicious activity
                      </p>
                    </div>
                    <Switch
                      checked={preferences.security}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("security", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Activity Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Scrapbook updates, new content, comments
                      </p>
                    </div>
                    <Switch
                      checked={preferences.activity}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("activity", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        System Messages
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Maintenance updates, feature announcements
                      </p>
                    </div>
                    <Switch
                      checked={preferences.system}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("system", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Reminders
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Backup reminders, scheduled tasks
                      </p>
                    </div>
                    <Switch
                      checked={preferences.reminders}
                      onCheckedChange={(checked) =>
                        handlePreferenceToggle("reminders", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Bell className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> Security alerts cannot be disabled for
                  your account's safety.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                View your notification history and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg border bg-muted/30">
                    <div className="text-2xl font-bold text-primary">
                      {notifications.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Notifications
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg border bg-muted/30">
                    <div className="text-2xl font-bold text-amber-600">
                      {unreadCount}
                    </div>
                    <div className="text-sm text-muted-foreground">Unread</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border bg-muted/30">
                    <div className="text-2xl font-bold text-green-600">
                      {
                        notifications.filter((n) => n.type === "security")
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Security Alerts
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        {getNotificationIcon(notification.type)}
                        <span className="flex-1">{notification.title}</span>
                        <span className="text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
