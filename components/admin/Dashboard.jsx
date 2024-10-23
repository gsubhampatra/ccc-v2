import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Overview of club activities</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Welcome to the admin dashboard!</p>
      </CardContent>
    </Card>
  )
}
