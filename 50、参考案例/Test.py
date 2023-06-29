# file-name: help.py
import argparse

def get_parser():
    parser = argparse.ArgumentParser(
        description='help demo')
    parser.add_argument('-arch', required=True, choices=['alexnet', 'vgg'],
        help='the architecture of CNN, at this time we only support alexnet and vgg.')

    return parser


if __name__ == '__main__':
    parser = get_parser()
    args = parser.parse_args()
    print('the arch of CNN is {}'.format(args.arch))
