# DB Sentinel 🚨

A real-time **MySQL monitoring** dashboard built with **Spring Boot + React**.  
Collects DB + system metrics, visualizes live charts, and sends **Gmail alerts** on anomalies.

## Features
- Live metrics: QPS, active connections, slow queries, avg query time, CPU, memory
- WebSocket real-time updates
- Historical trends (last ~10 minutes by default)
- Threshold-based Gmail alerts
- Free & simple stack (no Prometheus/Grafana required)

## Project Structure
db-sentinel/
├─ backend/ # Spring Boot (metrics, WebSocket, alerts)
└─ frontend/ # React + Vite + Chart.js

## Prerequisites
- Java 17+, Maven
- Node 18+
- MySQL 8+ (local or Docker)

### MySQL Quick Setup
```sql
CREATE DATABASE monitor_db;
CREATE USER 'monitor'@'%' IDENTIFIED BY 'monitor';


GRANT ALL PRIVILEGES ON monitor_db.* TO 'monitor'@'%';
FLUSH PRIVILEGES;
