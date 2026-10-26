package com.crateflow.app.model

object CamelotWheel {
    val ORDER = listOf(
        "1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B",
        "5A", "5B", "6A", "6B", "7A", "7B", "8A", "8B",
        "9A", "9B", "10A", "10B", "11A", "11B", "12A", "12B"
    )

    fun getIndex(key: String): Int = ORDER.indexOf(key).coerceAtLeast(0)

    fun isHarmonicallyCompatible(keyA: String, keyB: String): Boolean {
        if (keyA == keyB) return true
        val numA = keyA.filter { it.isDigit() }.toIntOrNull() ?: return false
        val letterA = keyA.last()
        val numB = keyB.filter { it.isDigit() }.toIntOrNull() ?: return false
        val letterB = keyB.last()

        // Same number, relative major/minor swap (e.g. 8A <-> 8B)
        if (numA == numB && letterA != letterB) return true

        // Adjacent number, same mode (e.g. 8A <-> 9A or 8A <-> 7A)
        if (letterA == letterB) {
            val diff = Math.abs(numA - numB)
            if (diff == 1 || diff == 11) return true
        }
        return false
    }
}
