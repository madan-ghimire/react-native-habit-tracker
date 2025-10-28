import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z } from "zod";

// ✅ Zod schemas
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signUpSchema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const theme = useTheme();
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    setErrors({});
    setGeneralError(null);

    const schema = isSignUp ? signUpSchema : signInSchema;
    const formData = isSignUp
      ? { name, email, password, confirmPassword }
      : { email, password };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
      >;
      const newErrors: Record<string, string> = {};
      for (const key in fieldErrors) {
        const messages = fieldErrors[key];
        if (messages && messages[0]) newErrors[key] = messages[0];
      }
      setErrors(newErrors);
      return;
    }

    try {
      if (isSignUp) {
        const error = await signUp(email, password, name); // pass name
        if (error) {
          setGeneralError(error);
          setSnackbarMessage(error);
          setSnackbarVisible(true);
          return;
        } else {
          setSnackbarMessage("Sign Up Successful!");
          setSnackbarVisible(true);
        }
      } else {
        const error = await signIn(email, password);
        if (error) {
          setGeneralError(error);
          setSnackbarMessage(error);
          setSnackbarVisible(true);
          return;
        } else {
          setSnackbarMessage("Signed In Successfully!");
          setSnackbarVisible(true);
          router.replace("/");
        }
      }
    } catch (err) {
      console.error(err);

      const msg = "Something went wrong. Please try again.";
      setGeneralError(msg);
      setSnackbarMessage(msg);
      setSnackbarVisible(true);
    }
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
    setErrors({});
    setGeneralError(null);
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

        {isSignUp && (
          <>
            <TextInput
              label="Full Name"
              mode="outlined"
              style={styles.input}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={!!errors.name}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.name}
              </Text>
            )}
          </>
        )}

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          error={!!errors.email}
        />
        {errors.email && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.email}
          </Text>
        )}

        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          error={!!errors.password}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {errors.password && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.password}
          </Text>
        )}

        {isSignUp && (
          <>
            <TextInput
              label="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              mode="outlined"
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.confirmPassword}
              </Text>
            )}
          </>
        )}

        {generalError && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {generalError}
          </Text>
        )}

        <Button style={styles.button} mode="contained" onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Button
          style={styles.switchModeButton}
          mode="text"
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Close",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
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
    marginBottom: 8,
  },
  errorText: {
    marginBottom: 8,
    fontSize: 13,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
