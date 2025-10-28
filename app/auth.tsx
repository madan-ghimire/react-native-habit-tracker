import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const router = useRouter();

  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);

    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }

      router.replace("/");
    }
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {error && <Text style={{ color: theme.colors.error }}>{error} </Text>}

        <Button style={styles.button} mode="contained" onPress={handleAuth}>
          {isSignUp ? "Sign up" : "Sign In"}{" "}
        </Button>
        <Button
          style={styles.switchModeButton}
          mode="text"
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}{" "}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});

// import { useAuth } from "@/lib/auth-context";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Button, Text, TextInput, useTheme } from "react-native-paper";

// export default function AuthScreen() {
//   const [isSignUp, setIsSignUp] = useState<boolean>(false);
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const theme = useTheme();
//   const router = useRouter();
//   const { signIn, signUp } = useAuth();

//   const handleAuth = async () => {
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }

//     setError(null);
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         const error = await signUp(email, password);
//         if (error) {
//           setError(error);
//           return;
//         }
//       } else {
//         const error = await signIn(email, password);
//         if (error) {
//           setError(error);
//           return;
//         }
//         router.replace("/");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSwitchMode = () => {
//     setIsSignUp((prev) => !prev);
//     setError(null);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <LinearGradient
//         colors={["#667eea", "#764ba2"]}
//         style={styles.gradient}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <View style={styles.content}>
//           {/* Logo/Icon Area */}
//           <View style={styles.logoContainer}>
//             <View style={styles.logoCircle}>
//               <Text style={styles.logoText}>✨</Text>
//             </View>
//           </View>

//           {/* Title */}
//           <Text style={styles.title}>
//             {isSignUp ? "Create Account" : "Welcome Back"}
//           </Text>
//           <Text style={styles.subtitle}>
//             {isSignUp ? "Sign up to get started" : "Sign in to continue"}
//           </Text>

//           {/* Input Card */}
//           <View style={styles.card}>
//             <TextInput
//               label="Email"
//               value={email}
//               autoCapitalize="none"
//               keyboardType="email-address"
//               placeholder="your@email.com"
//               mode="outlined"
//               style={styles.input}
//               outlineColor="transparent"
//               activeOutlineColor="#667eea"
//               onChangeText={setEmail}
//               theme={{
//                 colors: {
//                   background: "#f8f9fa",
//                 },
//               }}
//             />

//             <TextInput
//               label="Password"
//               value={password}
//               autoCapitalize="none"
//               secureTextEntry
//               placeholder="••••••••"
//               mode="outlined"
//               style={styles.input}
//               outlineColor="transparent"
//               activeOutlineColor="#667eea"
//               onChangeText={setPassword}
//               theme={{
//                 colors: {
//                   background: "#f8f9fa",
//                 },
//               }}
//             />

//             {error && (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             )}

//             <Button
//               mode="contained"
//               onPress={handleAuth}
//               loading={loading}
//               disabled={loading}
//               style={styles.button}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonLabel}
//               buttonColor="#667eea"
//             >
//               {isSignUp ? "Sign Up" : "Sign In"}
//             </Button>
//           </View>

//           {/* Switch Mode */}
//           <TouchableOpacity
//             onPress={handleSwitchMode}
//             style={styles.switchContainer}
//           >
//             <Text style={styles.switchText}>
//               {isSignUp
//                 ? "Already have an account? "
//                 : "Don't have an account? "}
//               <Text style={styles.switchTextBold}>
//                 {isSignUp ? "Sign In" : "Sign Up"}
//               </Text>
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     justifyContent: "center",
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "rgba(255, 255, 255, 0.3)",
//   },
//   logoText: {
//     fontSize: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "rgba(255, 255, 255, 0.85)",
//     textAlign: "center",
//     marginBottom: 40,
//     fontWeight: "400",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 24,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   input: {
//     marginBottom: 16,
//     backgroundColor: "#f8f9fa",
//   },
//   errorContainer: {
//     backgroundColor: "#fee",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: "#dc3545",
//   },
//   errorText: {
//     color: "#dc3545",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   button: {
//     marginTop: 8,
//     borderRadius: 12,
//     shadowColor: "#667eea",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   buttonContent: {
//     paddingVertical: 8,
//   },
//   buttonLabel: {
//     fontSize: 16,
//     fontWeight: "700",
//     letterSpacing: 0.5,
//   },
//   switchContainer: {
//     marginTop: 32,
//     alignItems: "center",
//   },
//   switchText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "400",
//   },
//   switchTextBold: {
//     fontWeight: "700",
//     textDecorationLine: "underline",
//   },
// });
