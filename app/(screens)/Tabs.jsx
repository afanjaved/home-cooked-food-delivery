import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="Products"/>
      <Tabs.Screen name="Oder" />
    </Tabs>
  );
}
