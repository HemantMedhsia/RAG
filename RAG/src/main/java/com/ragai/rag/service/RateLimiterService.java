package com.ragai.rag.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

	private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

	public Bucket resolveBucket(String key) {
		return cache.computeIfAbsent(key, this::newBucket);
	}

	@SuppressWarnings("deprecation")
	private Bucket newBucket(String key) {
		return Bucket4j.builder().addLimit(Bandwidth.simple(20, // 20 requests
				Duration.ofMinutes(1) // per minute
		)).build();
	}
}