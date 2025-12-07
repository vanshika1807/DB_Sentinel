package com.dbSentinel.DB_Sentinel.services;

import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
public class IncidentNotifier {

    // Your FIBO microservice endpoint
    private final String FIBO_URL = "http://127.0.0.1:8000/generate-from-log";

    private final ObjectMapper mapper = new ObjectMapper();

    public void sendIncident(String logText) {
        try {
            URL url = new URL(FIBO_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            conn.setDoOutput(true);

            Map<String, String> body = new HashMap<>();
            body.put("log_text", logText);

            String json = mapper.writeValueAsString(body);
            byte[] out = json.getBytes(StandardCharsets.UTF_8);

            conn.setFixedLengthStreamingMode(out.length);
            conn.connect();

            try (OutputStream os = conn.getOutputStream()) {
                os.write(out);
            }

            System.out.println("FIBO Response Code: " + conn.getResponseCode());
            conn.disconnect();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
