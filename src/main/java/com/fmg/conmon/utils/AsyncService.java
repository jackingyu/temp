package com.fmg.conmon.utils;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class AsyncService {
    private int poolSize;
    private ExecutorService executor = null;

    public AsyncService() {
        poolSize = Runtime.getRuntime().availableProcessors();
    }

    public AsyncService(int poolSize) {
        if (poolSize < 1)
            throw new IllegalArgumentException("Thread pool size at least 1.");
        this.poolSize = poolSize;
    }

    // Init ThreadPool
    public boolean start() {
        if (executor == null)
            executor = Executors.newFixedThreadPool(poolSize);
        return true;
    }

    // Shutdown ThreadPool
    public boolean close() {
        if (!executor.isShutdown()) {
            executor.shutdownNow();
            executor = null;
        }
        return true;
    }

    // Submit Task
    public <T> Future<T> submitTask(Callable<T> task) {
        if (executor == null)
            throw new IllegalStateException("AsyncService not init yet!");
        return executor.submit(task);
    }

    // Execute Thread
    public void executeThread(Runnable thread) {
        if (executor == null)
            throw new IllegalStateException("AsyncService not init yet!");
        executor.execute(thread);
    }
}
