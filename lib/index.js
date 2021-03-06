/**
 * MIT License
 *
 * Copyright (c) 2016 - 2017 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

const winston = require('winston')
const WinstonSection = require('./configuration/section')
const BaseLoggerProvider = require('@rduk/logger/lib/provider/base')

class WinstonLoggerProvider extends BaseLoggerProvider {
  initialize () {
    let section = new WinstonSection(this.config)
    this.logger = new winston.Logger({
      level: section.level,
      transports: section.transports
    })
  }
}

['error', 'warn', 'info', 'verbose', 'debug'].forEach(function (method) {
  WinstonLoggerProvider.prototype[method] = function () {
    this.logger[method].apply(this.logger, Array.prototype.splice.call(arguments, 0))
  }
})

module.exports = WinstonLoggerProvider
