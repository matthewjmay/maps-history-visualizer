const SAMPLE_DATA = {
  locations: [
    {
      timestampMs: "1445208674767",
      latitudeE7: 437296019,
      longitudeE7: -817111019,
      accuracy: 25,
      activity: [
        {
          timestampMs: "1445207427283",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445208738742",
      latitudeE7: 437296018,
      longitudeE7: -817111021,
      accuracy: 28,
      activity: [
        {
          timestampMs: "1445208710606",
          activity: [
            {
              type: "STILL",
              confidence: 42,
            },
            {
              type: "UNKNOWN",
              confidence: 34,
            },
            {
              type: "IN_VEHICLE",
              confidence: 23,
            },
            {
              type: "ON_FOOT",
              confidence: 2,
            },
            {
              type: "UNKNOWN",
              confidence: 2,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445208858828",
      latitudeE7: 437296022,
      longitudeE7: -817111020,
      accuracy: 25,
      activity: [
        {
          timestampMs: "1445208800737",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445208956397",
      latitudeE7: 437296022,
      longitudeE7: -817111020,
      accuracy: 171,
      activity: [
        {
          timestampMs: "1445208917879",
          activity: [
            {
              type: "STILL",
              confidence: 60,
            },
            {
              type: "IN_VEHICLE",
              confidence: 41,
            },
          ],
        },
        {
          timestampMs: "1445209014236",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445209109154",
      latitudeE7: 437296020,
      longitudeE7: -817111017,
      accuracy: 25,
      activity: [
        {
          timestampMs: "1445209136097",
          activity: [
            {
              type: "STILL",
              confidence: 73,
            },
            {
              type: "IN_VEHICLE",
              confidence: 25,
            },
            {
              type: "ON_BICYCLE",
              confidence: 2,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445209230565",
      latitudeE7: 437296022,
      longitudeE7: -817111020,
      accuracy: 25,
      activity: [
        {
          timestampMs: "1445209225513",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445209355626",
      latitudeE7: 437296024,
      longitudeE7: -817111022,
      accuracy: 24,
      activity: [
        {
          timestampMs: "1445209332379",
          activity: [
            {
              type: "STILL",
              confidence: 92,
            },
            {
              type: "IN_VEHICLE",
              confidence: 3,
            },
            {
              type: "ON_BICYCLE",
              confidence: 3,
            },
            {
              type: "ON_FOOT",
              confidence: 3,
            },
            {
              type: "UNKNOWN",
              confidence: 3,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445209483791",
      latitudeE7: 437296019,
      longitudeE7: -817111017,
      accuracy: 25,
      activity: [
        {
          timestampMs: "1445209421792",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
        {
          timestampMs: "1445209528169",
          activity: [
            {
              type: "STILL",
              confidence: 80,
            },
            {
              type: "IN_VEHICLE",
              confidence: 13,
            },
            {
              type: "ON_FOOT",
              confidence: 5,
            },
            {
              type: "UNKNOWN",
              confidence: 5,
            },
            {
              type: "ON_BICYCLE",
              confidence: 3,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445209604049",
      latitudeE7: 437296019,
      longitudeE7: -817111017,
      accuracy: 25,
    },
    {
      timestampMs: "1445209724217",
      latitudeE7: 437296033,
      longitudeE7: -817111006,
      accuracy: 23,
      activity: [
        {
          timestampMs: "1445209750931",
          activity: [
            {
              type: "STILL",
              confidence: 41,
            },
            {
              type: "IN_VEHICLE",
              confidence: 39,
            },
            {
              type: "UNKNOWN",
              confidence: 15,
            },
            {
              type: "ON_FOOT",
              confidence: 4,
            },
            {
              type: "UNKNOWN",
              confidence: 4,
            },
            {
              type: "ON_BICYCLE",
              confidence: 2,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445209847214",
      latitudeE7: 437296022,
      longitudeE7: -817111017,
      accuracy: 24,
    },
    {
      timestampMs: "1445209981425",
      latitudeE7: 437296036,
      longitudeE7: -817111009,
      accuracy: 22,
      activity: [
        {
          timestampMs: "1445209946868",
          activity: [
            {
              type: "IN_VEHICLE",
              confidence: 69,
            },
            {
              type: "STILL",
              confidence: 13,
            },
            {
              type: "UNKNOWN",
              confidence: 10,
            },
            {
              type: "ON_BICYCLE",
              confidence: 5,
            },
            {
              type: "ON_FOOT",
              confidence: 3,
            },
            {
              type: "UNKNOWN",
              confidence: 3,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445210034257",
      latitudeE7: 437296019,
      longitudeE7: -817111021,
      accuracy: 28,
      activity: [
        {
          timestampMs: "1445210066476",
          activity: [
            {
              type: "UNKNOWN",
              confidence: 42,
            },
            {
              type: "IN_VEHICLE",
              confidence: 31,
            },
            {
              type: "STILL",
              confidence: 15,
            },
            {
              type: "ON_BICYCLE",
              confidence: 8,
            },
            {
              type: "ON_FOOT",
              confidence: 4,
            },
            {
              type: "UNKNOWN",
              confidence: 4,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445210106445",
      latitudeE7: 437296022,
      longitudeE7: -817111018,
      accuracy: 24,
      activity: [
        {
          timestampMs: "1445210129029",
          activity: [
            {
              type: "STILL",
              confidence: 48,
            },
            {
              type: "UNKNOWN",
              confidence: 31,
            },
            {
              type: "IN_VEHICLE",
              confidence: 12,
            },
            {
              type: "ON_BICYCLE",
              confidence: 8,
            },
            {
              type: "ON_FOOT",
              confidence: 2,
            },
            {
              type: "UNKNOWN",
              confidence: 2,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445210155218",
      latitudeE7: 437296023,
      longitudeE7: -817111014,
      accuracy: 24,
      activity: [
        {
          timestampMs: "1445210156578",
          activity: [
            {
              type: "UNKNOWN",
              confidence: 44,
            },
            {
              type: "STILL",
              confidence: 38,
            },
            {
              type: "IN_VEHICLE",
              confidence: 16,
            },
            {
              type: "ON_FOOT",
              confidence: 2,
            },
            {
              type: "UNKNOWN",
              confidence: 2,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445210248296",
      latitudeE7: 437296022,
      longitudeE7: -817111018,
      accuracy: 24,
    },
    {
      timestampMs: "1445210296829",
      latitudeE7: 437296024,
      longitudeE7: -817111009,
      accuracy: 10,
      activity: [
        {
          timestampMs: "1445210287002",
          activity: [
            {
              type: "UNKNOWN",
              confidence: 50,
            },
            {
              type: "STILL",
              confidence: 25,
            },
            {
              type: "IN_VEHICLE",
              confidence: 21,
            },
            {
              type: "ON_BICYCLE",
              confidence: 4,
            },
          ],
        },
        {
          timestampMs: "1445210319273",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
        {
          timestampMs: "1445210323404",
          activity: [
            {
              type: "STILL",
              confidence: 60,
            },
            {
              type: "IN_VEHICLE",
              confidence: 25,
            },
            {
              type: "UNKNOWN",
              confidence: 15,
            },
          ],
        },
      ],
    },
    {
      timestampMs: "1445210460672",
      latitudeE7: 437296020,
      longitudeE7: -817111016,
      accuracy: 25,
      activity: [
        {
          timestampMs: "1445210395307",
          activity: [
            {
              type: "TILTING",
              confidence: 100,
            },
          ],
        },
        {
          timestampMs: "1445210487871",
          activity: [
            {
              type: "UNKNOWN",
              confidence: 50,
            },
            {
              type: "IN_VEHICLE",
              confidence: 28,
            },
            {
              type: "STILL",
              confidence: 19,
            },
            {
              type: "ON_BICYCLE",
              confidence: 1,
            },
            {
              type: "ON_FOOT",
              confidence: 1,
            },
            {
              type: "UNKNOWN",
              confidence: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default SAMPLE_DATA;
