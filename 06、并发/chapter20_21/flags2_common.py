"""
Utilities for second set of flag examples.
"""

import argparse
import string
import sys
import time
from collections import Counter
from enum import Enum
from pathlib import Path


DownloadStatus = Enum('DownloadStatus', 'OK NOT_FOUND ERROR')

POP20_CC = ('CN IN US ID BR PK NG BD RU JP '
            'MX PH VN ET EG DE IR TR CD FR').split()

DEFAULT_CONCUR_REQ = 1
MAX_CONCUR_REQ = 1

