import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session, SessionService } from 'src/app/services/session/session.service';
var crypto = require('crypto');
var forge = require('node-forge');
forge.options.usePureJavaScript = true;
const pako = require('pako');
const aKey = 'T@MiCr097124!iCR'
// npm i pako --save

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  session: Session;

  loading = [];

  private requests: HttpRequest<any>[] = [];
  user: any;
  secretKey: any = aKey;

  constructor(
    private _session: SessionService,
  ) {
    this._session.getSession().subscribe(res => {
      this.session = res;
    })
  }

  removeRequest(req: HttpRequest<any>) {

    this.requests.splice(0, 1);
    try {
      let req_with_loader = this.requests.filter(data => (!data.headers.get('header_type') || data.headers.get('header_type') == '1'))
      if (req_with_loader && req_with_loader.length == 0) {

      }
    }
    catch (err) {
      console.log(err)
    }
    if (this.requests.length <= 0) {

    }

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request instanceof HttpRequest)
      this.requests.push(request);
    let token;
    let language;
    let timestamp = Date.now();
    let ipObj;
    let ip = '123213';
    let region = 'IN';
    console.log(request)
    let hash = crypto.createHash('sha512')
      .update(timestamp + ip + region + aKey)
      .digest('hex')
    if (ipObj) {
      ip = ipObj['ip'];
      region = ipObj['country'];

    }
    if (this.session && this.session.token) {
      console.log(this.session)
      token = this.session.token;
      hash = crypto.createHash('sha512')
        .update(timestamp + ip + region + token)
        .digest('hex')
      language = '1';
      request = request.clone({
        setHeaders: {
          token: token.toString(),
          ip: ip.toString(),
          region: region.toString(),
          hash: hash.toString(),
          lngId: language.toString() || '1',
          timestamp: timestamp.toString()
        }
      });
      if (request.body) {
        if (request.body instanceof FormData) {
          // request = request.clone({
          //   body: this.set('T@MiCr097124!iCR', request.body)

          // })

        } else {
          this.user = this._session.getSessionData();
          if (this.user && this.user.secretkey) {
            this.secretKey = this.user.secretkey;
            request = request.clone({
              body: this.set(this.secretKey, request.body)
            })
          }
        }
      }


    }
    else {
      language = '1';
      hash = crypto.createHash('sha512')
        .update(timestamp + ip + region + aKey)
        .digest('hex')
      request = request.clone({
        setHeaders: {
          ip: ip.toString(),
          region: region.toString(),
          hash: hash.toString(),
          lngId: language.toString() || '1',
          timestamp: timestamp.toString()
        },
        body: this.set(aKey, request.body)
      });
      // request = request.clone({
      //   setParams: {
      //     token: token,
      //     lngId: language || 1,
      //   },
      // })
    }
    let header_type;
    return Observable.create(observer => {
      if (!request.headers.has('disable_loader')) {
        header_type = request.headers.get('header_type');
        if (header_type == '2' || header_type == 2) {
        }
        else {
        }
      }
      // console.log("aaaaaaaaaaaaaaaaaaaaa");
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              // if (event && event.body && event.body.data) {
              //   if (this.secretKey) {
              //     event.body.data = this.get(this.secretKey, event.body.data)
              //   }
              //   else {
              //     this.user = this._session.getSessionData();
              //     if (this.user && this.user.secretkey) {
              //       this.secretKey = this.user.secretkey;
              //       request = request.clone({
              //         body: this.set(this.secretKey, request.body)
              //       })
              //     }
              //     // event.body.data = this.get(this.secretKey, event.body.data)
              //   }
              // }
              // console.log("adaaaaaaa"+event.status);
              if (event && event.body && event.body.message && !event.body.status) {
              }
              if (event.status === 401 || (event.body && event.body.code && event.body.code == 401)) {
                // auto logout if 401 response returned from api
                this.requests = [];
                this._session.logout();
                // location.reload(true);
              }
              else {
                this.removeRequest(request);
                observer.next(event);
              }

            }
          },
          err => {
            this.removeRequest(request);
            observer.error(err);
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
  set(keys, value) {
    try {
      var textEncoder = new TextEncoder(); //similar to buffer in node js
      var iv = '1234567891234567';
      var md = forge.md.sha256.create();//create sha 256 hash
      md.update(keys);
      var key = md.digest();
      var encodedData = textEncoder.encode(JSON.stringify(value)); //stringify to json and convert to buffer
      var gzippedData = pako.gzip(encodedData); //compress                   
      var cipher = forge.cipher.createCipher('AES-CBC', key);//pad7 by default :)
      cipher.start({ iv: iv });
      cipher.update(forge.util.createBuffer(gzippedData));
      cipher.finish();
      var encrypted = cipher.output;
      return { data: forge.util.encode64(encrypted.data) }
    }
    catch (err) {
      console.log(err)
      return
    }

  }

  //The get method is use for decrypt the value.
  get(keys, value) {
    try {
      var textDecoder = new TextDecoder();
      var iv = '1234567891234567';

      var md = forge.md.sha256.create();
      md.update(keys);
      var key = md.digest();
      var encryptedBytes = forge.util.decode64(value);
      var decipher = forge.cipher.createDecipher('AES-CBC', key);
      decipher.start({ iv: iv });
      var length = encryptedBytes.length;
      var chunkSize = 1024 * 64;
      var index = 0;
      var decrypted = '';
      do {
        decrypted += decipher.output.getBytes();
        var buf = forge.util.createBuffer(encryptedBytes.substr(index, chunkSize));
        decipher.update(buf);
        index += chunkSize;
      } while (index < length);
      var result = decipher.finish();
      decrypted += decipher.output.getBytes();
      console.log(decrypted)
      var decodedData = pako.ungzip(decrypted);
      var dataObject = JSON.parse(textDecoder.decode(decodedData));
      console.log(dataObject);
      return dataObject
    }
    catch (err) {
      console.log(err);
      return value
    }

  }
}
