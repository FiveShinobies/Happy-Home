#!/bin/sh

# wait-for-backend.sh
# Wait until backend /actuator/health returns HTTP 200, then start nginx.

BACKEND_URL="http://backend:8080/actuator/health"
MAX_RETRIES=60
SLEEP=1

i=0
printf "Waiting for backend at %s\n" "$BACKEND_URL"
while ! curl -sSf "$BACKEND_URL" >/dev/null 2>&1; do
  i=$((i+1))
  if [ "$i" -ge "$MAX_RETRIES" ]; then
    printf "Backend not reachable after %s attempts, starting nginx anyway\n" "$MAX_RETRIES"
    break
  fi
  printf "."
  sleep "$SLEEP"
done
printf "\nStarting nginx...\n"
exec nginx -g 'daemon off;'
