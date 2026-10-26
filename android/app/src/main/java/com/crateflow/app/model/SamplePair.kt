package com.crateflow.app.model

data class AncestryNode(
    val generation: Int,
    val title: String,
    val artist: String,
    val year: Int,
    val role: String
)

data class CommunityStats(
    val verifiedBy: Int,
    val isVerified: Boolean,
    val submissionsCount: Int,
    val curatorNote: String
)

data class SamplePair(
    val id: String,
    val trackA: Track, // Modern Release
    val trackB: Track, // Original Sample
    val ancestry: List<AncestryNode>,
    val community: CommunityStats
)
